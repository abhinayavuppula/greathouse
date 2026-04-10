import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { queryClient } from '../../lib/queryClient'
import { Search, Plus, CheckCircle, XCircle, Trash2, Flag, Clock, CheckCheck } from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { toast } from 'sonner'
import { cn } from '../../lib/utils'

const STATUS_OPTIONS = ['NEW', 'IN_PROGRESS', 'RESOLVED', 'SPAM'] as const

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  NEW: { label: 'New', color: 'bg-blue-50 text-blue-700', icon: Clock },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-amber-50 text-amber-700', icon: Clock },
  RESOLVED: { label: 'Resolved', color: 'bg-green-50 text-green-700', icon: CheckCheck },
  SPAM: { label: 'Spam', color: 'bg-red-50 text-red-700', icon: Flag },
}

interface Inquiry {
  id: string; name: string; email: string; phone?: string; subject?: string; message: string; status: string; notes?: string; createdAt: string
}

export default function Inquiries() {
  const [statusFilter, setStatusFilter] = useState<string>('NEW')
  const [selected, setSelected] = useState<Inquiry | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['inquiries', statusFilter],
    queryFn: async () => {
      const url = statusFilter ? `/inquiries?status=${statusFilter}&limit=50` : '/inquiries?limit=50'
      const r = await api.get(url)
      return r.data.data as Inquiry[]
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: string; status?: string; notes?: string }) => api.put(`/inquiries/${id}`, { status, notes }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['inquiries'] }); toast.success('Inquiry updated') },
  })

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Inquiries" subtitle="Customer inquiry management" />

      <div className="flex-1 flex overflow-hidden">
        {/* List panel */}
        <div className="w-[360px] flex-shrink-0 border-r border-border flex flex-col overflow-hidden bg-white">
          <div className="px-3 py-3 border-b border-border space-y-2">
            <div className="flex gap-1">
              {[{ label: 'All', value: '' }, ...STATUS_OPTIONS.map((s) => ({ label: STATUS_CONFIG[s].label, value: s }))].map(({ label, value }) => (
                <button key={value} onClick={() => setStatusFilter(value)} className={cn('px-2 py-1 text-[10px] rounded border font-medium flex-1 transition-colors', statusFilter === value ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:text-foreground')}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {isLoading ? (
              <div className="py-8 text-center"><div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" /></div>
            ) : data?.map((inq) => {
              const cfg = STATUS_CONFIG[inq.status]
              const Icon = cfg.icon
              return (
                <button key={inq.id} onClick={() => setSelected(inq)} className={cn('w-full text-left px-4 py-3.5 hover:bg-accent/30 transition-colors', selected?.id === inq.id && 'bg-gold/5 border-l-2 border-gold')}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium truncate">{inq.name}</p>
                    <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap flex-shrink-0', cfg.color)}>{cfg.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{inq.subject || inq.email}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1"><Clock size={10} /> {formatDate(inq.createdAt)}</p>
                </button>
              )
            })}
            {!isLoading && !data?.length && (
              <p className="py-8 text-center text-sm text-muted-foreground">No inquiries found</p>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 flex flex-col overflow-hidden bg-canvas">
          {selected ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl space-y-4">
                <div className="bg-white rounded-lg border border-border p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{selected.name}</h3>
                      <p className="text-xs text-muted-foreground">{selected.email}{selected.phone ? ` · ${selected.phone}` : ''}</p>
                    </div>
                    <span className={cn('text-xs px-2 py-1 rounded-full font-medium', STATUS_CONFIG[selected.status].color)}>
                      {STATUS_CONFIG[selected.status].label}
                    </span>
                  </div>
                  {selected.subject && <p className="text-xs font-medium text-muted-foreground mb-2">Re: {selected.subject}</p>}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  <p className="text-xs text-muted-foreground mt-4">{formatDate(selected.createdAt)}</p>
                </div>

                <div className="bg-white rounded-lg border border-border p-5">
                  <p className="text-xs font-semibold mb-3">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((status) => (
                      <button key={status} onClick={() => updateMutation.mutate({ id: selected.id, status })}
                        className={cn('px-3 py-1.5 text-xs rounded border font-medium transition-colors', selected.status === status ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:text-foreground')}>
                        {STATUS_CONFIG[status].label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-border p-5">
                  <p className="text-xs font-semibold mb-2">Internal Notes</p>
                  <textarea
                    defaultValue={selected.notes || ''}
                    onBlur={(e) => updateMutation.mutate({ id: selected.id, notes: e.target.value })}
                    rows={4}
                    placeholder="Add internal notes…"
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
              <div>
                <CheckCircle size={40} className="mx-auto mb-3 opacity-20" />
                <p className="text-sm">Select an inquiry to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

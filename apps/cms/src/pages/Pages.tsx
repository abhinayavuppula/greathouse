import { useQuery, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { queryClient } from '../../lib/queryClient'
import { Plus, Edit2, Globe, EyeOff, Trash2 } from 'lucide-react'
import { formatDate } from '../../lib/utils'
import { toast } from 'sonner'
import type { Page } from '@greathouses/shared-types'

export default function Pages() {
  const { data: pages, isLoading } = useQuery({
    queryKey: ['pages'],
    queryFn: async () => {
      const r = await api.get('/pages')
      return r.data.data as Page[]
    },
  })

  const createMutation = useMutation({
    mutationFn: async () => {
      const title = prompt('Page title:')
      const slug = prompt('Page slug (e.g. "home"):')
      if (!title || !slug) return null
      const r = await api.post('/pages', { title, slug })
      return r.data.data as Page
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['pages'] })
        toast.success('Page created')
      }
    },
    onError: () => toast.error('Failed to create page'),
  })

  const publishMutation = useMutation({
    mutationFn: async (id: string) => api.patch(`/pages/${id}/publish`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
      toast.success('Publish status updated')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/pages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] })
      toast.success('Page deleted')
    },
    onError: () => toast.error('Failed to delete page'),
  })

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar
        title="Pages"
        subtitle="Manage your CMS pages"
        actions={
          <button
            onClick={() => createMutation.mutate()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white rounded text-xs font-semibold hover:bg-gold-dark transition-colors"
          >
            <Plus size={13} /> New Page
          </button>
        }
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-border bg-accent/30">
            {['Page', 'Sections', 'Status', 'Last Updated', 'Actions'].map((h) => (
              <p key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</p>
            ))}
          </div>

          {isLoading ? (
            <div className="py-12 text-center">
              <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="divide-y divide-border">
              {pages?.map((page) => (
                <div key={page.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-3.5 hover:bg-accent/20 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{page.title}</p>
                    <p className="text-xs text-muted-foreground">/{page.slug}</p>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">{(page as Page & { _count?: { sections: number } })._count?.sections ?? '—'}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${page.published ? 'bg-green-50 text-green-700' : 'bg-accent text-muted-foreground'}`}>
                    {page.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(page.updatedAt)}</span>
                  <div className="flex items-center gap-1">
                    <Link to={`/pages/${page.id}/edit`} className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors" title="Edit">
                      <Edit2 size={14} />
                    </Link>
                    <button onClick={() => publishMutation.mutate(page.id)} className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors" title={page.published ? 'Unpublish' : 'Publish'}>
                      {page.published ? <EyeOff size={14} /> : <Globe size={14} />}
                    </button>
                    <button onClick={() => { if (confirm(`Delete "${page.title}"?`)) deleteMutation.mutate(page.id) }} className="p-1.5 text-muted-foreground hover:text-destructive rounded transition-colors" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {!pages?.length && (
                <p className="py-8 text-center text-sm text-muted-foreground">No pages yet. Create your first page.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

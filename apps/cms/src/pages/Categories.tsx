import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { queryClient } from '../../lib/queryClient'
import { Plus, Edit2, Trash2, Folder, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '../../lib/utils'
import type { Category } from '@greathouses/shared-types'

export default function Categories() {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Category>>({ name: '', slug: '', description: '', visible: true })

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const r = await api.get('/categories')
      return r.data.data as Category[]
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: Partial<Category>) => {
      if (editingId && editingId !== 'new') {
        return api.put(`/categories/${editingId}`, data)
      }
      return api.post('/categories', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category saved')
      setEditingId(null)
      setFormData({ name: '', slug: '', description: '', visible: true })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category deleted')
    },
  })

  function handleEdit(cat: Category) {
    setEditingId(cat.id)
    setFormData(cat)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar
        title="Categories"
        subtitle="Organize your collection by type"
        actions={
          <button
            onClick={() => { setEditingId('new'); setFormData({ name: '', slug: '', description: '', visible: true }) }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white rounded text-xs font-semibold hover:bg-gold-dark transition-colors"
          >
            <Plus size={13} /> New Category
          </button>
        }
      />

      <div className="flex-1 flex overflow-hidden">
        {/* List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg border border-border divide-y divide-border">
            {isLoading ? (
              <div className="py-12 text-center"><div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" /></div>
            ) : categories?.map((cat) => (
              <div key={cat.id} className={cn("flex items-center gap-4 px-5 py-4 hover:bg-accent/10 transition-colors", editingId === cat.id && "bg-gold/5")}>
                <div className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center text-muted-foreground flex-shrink-0 overflow-hidden">
                  {cat.image ? <img src={cat.image} className="w-full h-full object-cover" /> : <Folder size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">/{cat.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleEdit(cat)} className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors"><Edit2 size={14} /></button>
                  <button onClick={() => { if(confirm(`Delete ${cat.name}?`)) deleteMutation.mutate(cat.id) }} className="p-1.5 text-muted-foreground hover:text-destructive rounded transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Sidebar */}
        {editingId && (
          <div className="w-80 bg-white border-l border-border flex flex-col overflow-hidden p-6 space-y-4">
            <h3 className="text-sm font-semibold">{editingId === 'new' ? 'New Category' : 'Edit Category'}</h3>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Slug</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">Description</label>
              <textarea value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs font-medium">Visible in Menu</span>
              <input type="checkbox" checked={formData.visible} onChange={(e) => setFormData({...formData, visible: e.target.checked})} className="accent-gold" />
            </div>
            <div className="pt-4 flex gap-2">
              <button onClick={() => setEditingId(null)} className="flex-1 px-3 py-2 text-xs border border-border rounded hover:bg-accent transition-colors">Cancel</button>
              <button onClick={() => mutation.mutate(formData)} disabled={mutation.isPending} className="flex-1 px-3 py-2 text-xs bg-gold text-white rounded font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50">
                {mutation.isPending ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

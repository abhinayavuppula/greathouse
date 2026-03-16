import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { queryClient } from '../../lib/queryClient'
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Star } from 'lucide-react'
import { formatDate, formatPrice } from '../../lib/utils'
import { toast } from 'sonner'
import { cn } from '../../lib/utils'
import { parsePagination } from '../../lib/pagination'

interface Product {
  id: string; name: string; slug: string; price: string; salePrice?: string; sku: string;
  inStock: boolean; featured: boolean; newArrival: boolean; publishedAt?: string;
  category?: { name: string }; images: Array<{ url: string; isPrimary: boolean }>
  updatedAt: string;
}

export default function Products() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [featured, setFeatured] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['products', page, search, featured],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '20', ...(search && { search }), ...(featured && { featured: 'true' }) })
      const r = await api.get(`/products?${params}`)
      return { products: r.data.data as Product[], meta: r.data.meta }
    },
  })

  const toggleMutation = useMutation({
    mutationFn: async ({ id, field }: { id: string; field: string }) => api.patch(`/products/${id}/toggle`, { field }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['products'] }); toast.success('Updated') },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['products'] }); toast.success('Product deleted') },
  })

  const primaryImage = (p: Product) => p.images?.find((i) => i.isPrimary)?.url || p.images?.[0]?.url

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Products" subtitle="Manage your product catalogue" actions={
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white rounded text-xs font-semibold hover:bg-gold-dark transition-colors">
          <Plus size={13} /> Add Product
        </button>
      } />
      <div className="flex items-center gap-3 px-6 py-3 bg-white border-b border-border">
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Search products…" className="px-3 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold w-56" />
        <label className="flex items-center gap-1.5 text-xs cursor-pointer">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-gold" />
          Featured only
        </label>
        <p className="text-xs text-muted-foreground ml-auto">{data?.meta?.total ?? 0} products</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-accent/30 border-b border-border z-10">
            <tr>{['Product', 'Category', 'Price', 'Stock', 'Featured', 'Updated', 'Actions'].map((h) => (
              <th key={h} className="text-left px-4 py-2.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {data?.products.map((p) => (
              <tr key={p.id} className="hover:bg-accent/10 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-accent flex-shrink-0 overflow-hidden">
                      {primaryImage(p) && <img src={primaryImage(p)} alt={p.name} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{p.category?.name || '—'}</td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium">{formatPrice(p.price)}</p>
                  {p.salePrice && <p className="text-xs text-muted-foreground line-through">{formatPrice(p.salePrice)}</p>}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleMutation.mutate({ id: p.id, field: 'inStock' })} className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', p.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                    {p.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleMutation.mutate({ id: p.id, field: 'featured' })} className={cn('p-1 rounded transition-colors', p.featured ? 'text-gold' : 'text-muted-foreground hover:text-gold')}>
                    <Star size={14} fill={p.featured ? 'currentColor' : 'none'} />
                  </button>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(p.updatedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors" title="Edit"><Edit2 size={13} /></button>
                    <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) deleteMutation.mutate(p.id) }} className="p-1.5 text-muted-foreground hover:text-destructive rounded transition-colors" title="Delete"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <div className="py-12 text-center"><div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" /></div>}
        {!isLoading && !data?.products.length && <p className="py-12 text-center text-sm text-muted-foreground">No products found</p>}
      </div>
      {data?.meta && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-3 border-t border-border bg-white">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 text-xs border border-border rounded disabled:opacity-50">Prev</button>
          <span className="text-xs text-muted-foreground">Page {page} of {data.meta.totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(data.meta.totalPages, p + 1))} disabled={page === data.meta.totalPages} className="px-3 py-1 text-xs border border-border rounded disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { ImagePickerField } from '../../components/editor/shared/ImagePickerField'
import { queryClient } from '../../lib/queryClient'
import { toast } from 'sonner'
import { Save, ArrowLeft, Plus, Trash2, Star } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Product, Category } from '@greathouses/shared-types'

export default function ProductForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = !!id

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const r = await api.get(`/products/${id}`)
      return r.data.data as Product
    },
    enabled: isEditing,
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const r = await api.get('/categories')
      return r.data.data as Category[]
    },
  })

  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    price: '0' as any,
    sku: '',
    inStock: true,
    featured: false,
    newArrival: false,
    categoryId: '',
    images: [],
    materials: [],
    colors: [],
    tags: [],
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const mutation = useMutation({
    mutationFn: async (data: Partial<Product>) => {
      if (isEditing) {
        return api.put(`/products/${id}`, data)
      }
      return api.post('/products', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success(isEditing ? 'Product updated' : 'Product created')
      navigate('/products')
    },
    onError: () => toast.error('Failed to save product'),
  })

  if (isLoadingProduct) return <div className="p-8 text-center text-muted-foreground">Loading product…</div>

  function updateField(field: keyof Product, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleImageAdd(url: string) {
    const images = [...(formData.images as any[]), { url, alt: '', isPrimary: (formData.images as any[]).length === 0 }]
    updateField('images', images)
  }

  function togglePrimary(index: number) {
    const images = (formData.images as any[]).map((img, i) => ({ ...img, isPrimary: i === index }))
    updateField('images', images)
  }

  function removeImage(index: number) {
    const images = (formData.images as any[]).filter((_, i) => i !== index)
    updateField('images', images)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar
        title={isEditing ? 'Edit Product' : 'Add New Product'}
        subtitle={isEditing ? product?.name : 'Create a new piece in the collection'}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/products')} className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
            <button
              onClick={() => mutation.mutate(formData)}
              disabled={mutation.isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white rounded text-xs font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              <Save size={13} /> {mutation.isPending ? 'Saving…' : 'Save Product'}
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-border p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="e.g. Maharani Carved Console Table"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => updateField('slug', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                    placeholder="maharani-console"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => updateField('sku', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                    placeholder="GH-MAH-001"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="Describe the piece, its history, and craftsmanship..."
                />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-5">
              <label className="text-xs font-medium text-muted-foreground block mb-3">Product Images</label>
              <div className="grid grid-cols-4 gap-3">
                {(formData.images as any[])?.map((img, i) => (
                  <div key={i} className="group relative aspect-square rounded border border-border overflow-hidden bg-accent/20">
                    <img src={img.url} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      <button onClick={() => togglePrimary(i)} className={cn('p-1.5 rounded transition-colors', img.isPrimary ? 'bg-gold text-white' : 'bg-white/20 text-white hover:bg-white/40')}>
                        <Star size={12} fill={img.isPrimary ? 'currentColor' : 'none'} />
                      </button>
                      <button onClick={() => removeImage(i)} className="p-1.5 bg-red-500/80 text-white rounded hover:bg-red-500 transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                    {img.isPrimary && <span className="absolute top-1 left-1 bg-gold text-white text-[8px] px-1 py-0.5 rounded-sm uppercase font-bold">Primary</span>}
                  </div>
                ))}
                <ImagePickerField label="" value="" onChange={handleImageAdd} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-border p-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Properties</h3>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1">Category</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => updateField('categoryId', e.target.value)}
                  className="w-full px-2 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Price (₹)</label>
                  <input type="number" value={formData.price as any} onChange={(e) => updateField('price', e.target.value)} className="w-full px-2 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Sale Price</label>
                  <input type="number" value={formData.salePrice as any} onChange={(e) => updateField('salePrice', e.target.value)} className="w-full px-2 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-border p-5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visibility & Stock</h3>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs">In Stock</span>
                <input type="checkbox" checked={formData.inStock} onChange={(e) => updateField('inStock', e.target.checked)} className="accent-gold w-4 h-4" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs">Featured Piece</span>
                <input type="checkbox" checked={formData.featured} onChange={(e) => updateField('featured', e.target.checked)} className="accent-gold w-4 h-4" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs">New Arrival</span>
                <input type="checkbox" checked={formData.newArrival} onChange={(e) => updateField('newArrival', e.target.checked)} className="accent-gold w-4 h-4" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { uploadFromBuffer } from '../../lib/uploadHelper'
import { formatFileSize, formatDate } from '../../lib/utils'
import { Search, Upload, Trash2, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import { queryClient } from '../../lib/queryClient'
import type { MediaAsset } from '@greathouses/shared-types'

export default function Media() {
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['media', search],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: '48', ...(search && { search }) })
      const r = await api.get(`/media?${params}`)
      return r.data.data as MediaAsset[]
    },
  })

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    try {
      const formData = new FormData()
      files.forEach((f) => formData.append('file', f))
      await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      queryClient.invalidateQueries({ queryKey: ['media'] })
      toast.success(`${files.length} file(s) uploaded`)
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this asset? This cannot be undone.')) return
    try {
      await api.delete(`/media/${id}`)
      queryClient.invalidateQueries({ queryKey: ['media'] })
      toast.success('Asset deleted')
    } catch {
      toast.error('Failed to delete asset')
    }
  }

  function handleCopy(url: string, id: string) {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    toast.success('URL copied!')
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar
        title="Media Library"
        subtitle="Manage your uploaded assets"
        actions={
          <label className={`flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white rounded text-xs font-semibold cursor-pointer hover:bg-gold-dark transition-colors ${uploading ? 'opacity-50' : ''}`}>
            <Upload size={13} />
            {uploading ? 'Uploading…' : 'Upload Files'}
            <input type="file" multiple accept="image/*,video/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        }
      />

      <div className="flex items-center gap-3 px-6 py-3 bg-white border-b border-border">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets…"
            className="w-full pl-9 pr-3 py-1.5 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
        {data && <p className="text-xs text-muted-foreground">{data.length} assets</p>}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="py-12 text-center">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-3">
            {data?.map((asset) => (
              <div key={asset.id} className="group relative bg-white rounded-lg border border-border overflow-hidden hover:border-gold/50 hover:shadow-sm transition-all">
                <div className="aspect-square bg-accent/50">
                  {asset.mimeType.startsWith('image/') ? (
                    <img src={asset.url} alt={asset.alt || asset.filename} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      <span>🎬 VIDEO</span>
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-[10px] font-medium truncate text-foreground">{asset.filename}</p>
                  <p className="text-[10px] text-muted-foreground">{formatFileSize(asset.size)}</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopy(asset.url, asset.id)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === asset.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 rounded text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}

            {!data?.length && (
              <div className="col-span-6 py-16 text-center text-muted-foreground">
                <p className="text-sm">No media assets yet</p>
                <p className="text-xs mt-1">Upload your first image or video above</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

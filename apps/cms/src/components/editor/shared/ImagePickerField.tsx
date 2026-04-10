import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../lib/api'
import { Image as ImageIcon, Upload, X, Check } from 'lucide-react'
import { cn } from '../../../lib/utils'
import type { MediaAsset } from '@greathouses/shared-types'

interface ImagePickerFieldProps {
  label?: string
  value: string
  onChange: (url: string) => void
  className?: string
}

export function ImagePickerField({ label, value, onChange, className }: ImagePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tab, setTab] = useState<'library' | 'url'>('library')
  const [urlInput, setUrlInput] = useState(value || '')
  const [uploading, setUploading] = useState(false)

  const { data: mediaData } = useQuery({
    queryKey: ['media', 'picker'],
    queryFn: async () => {
      const res = await api.get('/media?limit=48')
      return res.data.data as MediaAsset[]
    },
    enabled: isOpen,
  })

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const asset = res.data.data?.[0]
      if (asset) {
        onChange(asset.url)
        setIsOpen(false)
      }
    } catch (err) {
      // TODO: toast error
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={cn('space-y-1', className)}>
      {label && <p className="text-xs text-muted-foreground font-medium">{label}</p>}

      {/* Preview + trigger */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex-1 flex items-center gap-2 px-3 py-2 border border-border rounded text-sm text-left hover:border-gold transition-colors bg-white"
        >
          {value ? (
            <img src={value} alt="selected" className="w-8 h-8 rounded object-cover flex-shrink-0" />
          ) : (
            <ImageIcon size={16} className="text-muted-foreground flex-shrink-0" />
          )}
          <span className="text-muted-foreground truncate text-xs">
            {value ? value.split('/').pop()?.split('?')[0] || 'Image selected' : 'Select image…'}
          </span>
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-2xl w-[640px] max-h-[80vh] flex flex-col overflow-hidden z-10">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-semibold text-sm">Select Image</h3>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 py-3 border-b border-border bg-accent/30">
              <button
                onClick={() => setTab('library')}
                className={cn('px-3 py-1.5 rounded text-xs font-medium transition-colors', tab === 'library' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground')}
              >
                Media Library
              </button>
              <button
                onClick={() => setTab('url')}
                className={cn('px-3 py-1.5 rounded text-xs font-medium transition-colors', tab === 'url' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground')}
              >
                Enter URL
              </button>
              <label className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-gold text-white rounded text-xs font-medium cursor-pointer hover:bg-gold-dark transition-colors">
                <Upload size={12} />
                {uploading ? 'Uploading…' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
              </label>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {tab === 'library' ? (
                <div className="grid grid-cols-5 gap-2">
                  {mediaData?.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => {
                        onChange(asset.url)
                        setIsOpen(false)
                      }}
                      className={cn(
                        'relative aspect-square rounded-md overflow-hidden border-2 transition-all hover:border-gold',
                        value === asset.url ? 'border-gold' : 'border-border'
                      )}
                    >
                      <img src={asset.url} alt={asset.alt || asset.filename} className="w-full h-full object-cover" />
                      {value === asset.url && (
                        <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                          <Check size={16} className="text-gold" />
                        </div>
                      )}
                    </button>
                  ))}
                  {(!mediaData || mediaData.length === 0) && (
                    <p className="col-span-5 text-center text-sm text-muted-foreground py-8">No media uploaded yet</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  {urlInput && (
                    <img src={urlInput} alt="preview" className="max-h-64 rounded-md border border-border object-contain mx-auto" onError={() => {}} />
                  )}
                  <button
                    onClick={() => { onChange(urlInput); setIsOpen(false) }}
                    disabled={!urlInput}
                    className="w-full py-2 bg-gold text-white rounded text-sm font-medium hover:bg-gold-dark disabled:opacity-50 transition-colors"
                  >
                    Use This Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

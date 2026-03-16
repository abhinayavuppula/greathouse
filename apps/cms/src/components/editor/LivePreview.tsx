import { Monitor, Tablet, Smartphone } from 'lucide-react'
import { useEditorStore } from '../../../store/editorStore'
import { cn } from '../../../lib/utils'

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'https://greathouses.in'

const DEVICE_CONFIG = {
  desktop: { label: 'Desktop', icon: Monitor, width: '100%', previewWidth: 'w-full' },
  tablet: { label: 'Tablet', icon: Tablet, width: '768px', previewWidth: 'w-[768px]' },
  mobile: { label: 'Mobile', icon: Smartphone, width: '390px', previewWidth: 'w-[390px]' },
}

export function LivePreview() {
  const { activePage, previewDevice, setPreviewDevice } = useEditorStore()
  const config = DEVICE_CONFIG[previewDevice]

  if (!activePage) {
    return (
      <div className="flex-1 flex items-center justify-center bg-canvas">
        <p className="text-sm text-muted-foreground">Select a page to preview</p>
      </div>
    )
  }

  const previewUrl = `${FRONTEND_URL}/${activePage.slug}?preview=1&t=${Date.now()}`

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#e8e4df]">
      {/* Device toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white border-b border-border flex-shrink-0">
        {(Object.entries(DEVICE_CONFIG) as Array<[typeof previewDevice, typeof config]>).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setPreviewDevice(key)}
            title={cfg.label}
            className={cn(
              'p-1.5 rounded transition-colors',
              previewDevice === key
                ? 'bg-gold/10 text-gold'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <cfg.icon size={16} />
          </button>
        ))}
        <div className="flex-1" />
        <p className="text-[10px] text-muted-foreground font-mono">{config.width}</p>
      </div>

      {/* Iframe container */}
      <div className="flex-1 overflow-auto flex justify-center p-4">
        <div
          className={cn(
            'h-full rounded-lg overflow-hidden shadow-xl transition-all duration-300',
            previewDevice === 'desktop' ? 'w-full' : config.previewWidth,
          )}
        >
          <iframe
            key={previewDevice}
            src={previewUrl}
            className="w-full h-full border-0"
            title={`Preview: ${activePage.title}`}
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>
    </div>
  )
}

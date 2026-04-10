// Stubs for remaining panels — these render a simple field editor
// They follow the same interface pattern as HeroBannerPanel
export { NewsletterPanel as ContactFormPanel } from './NewsletterPanel'

import type { TestimonialsCarouselContent, TeamGridContent, GalleryGridContent, VideoEmbedContent, CollectionShowcaseContent, CategoryGridContent, CustomHtmlContent } from '@greathouses/shared-types'
import { cn } from '../../../lib/utils'

// ── Testimonials Panel ────────────────────────────────────────────────────────
interface TestimonialsProps { content: TestimonialsCarouselContent; onChange: (c: Partial<TestimonialsCarouselContent>) => void }
export function TestimonialsPanel({ content, onChange }: TestimonialsProps) {
  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-xs">
        <input type="checkbox" checked={content.showAllFeatured} onChange={(e) => onChange({ showAllFeatured: e.target.checked })} className="accent-gold" />
        Show all featured testimonials
      </label>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Layout</p>
        <div className="flex gap-2">
          {(['carousel', 'grid'] as const).map((v) => (
            <button key={v} onClick={() => onChange({ layout: v })} className={cn('flex-1 py-2 text-xs rounded border capitalize', content.layout === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{v}</button>
          ))}
        </div>
      </div>
      {(['showAvatar', 'showRating', 'showCompany', 'autoplay'] as const).map((key) => (
        <label key={key} className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={Boolean(content[key])} onChange={(e) => onChange({ [key]: e.target.checked })} className="accent-gold" />
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </label>
      ))}
      {content.autoplay && (
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium">Autoplay Interval (seconds)</p>
          <input type="number" value={content.autoplayInterval} onChange={(e) => onChange({ autoplayInterval: parseInt(e.target.value) || 5 })} min={2} max={20} className="w-full px-2 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
        </div>
      )}
    </div>
  )
}

// ── Team Grid Panel ───────────────────────────────────────────────────────────
interface TeamGridProps { content: TeamGridContent; onChange: (c: Partial<TeamGridContent>) => void }
export function TeamGridPanel({ content, onChange }: TeamGridProps) {
  return (
    <div className="space-y-4">
      <div><p className="text-xs text-muted-foreground font-medium mb-1">Section Title</p>
      <input type="text" value={content.sectionTitle || ''} onChange={(e) => onChange({ sectionTitle: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none" /></div>
      <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={content.showAllVisible} onChange={(e) => onChange({ showAllVisible: e.target.checked })} className="accent-gold" />Show all visible members</label>
      <div className="space-y-1"><p className="text-xs text-muted-foreground font-medium">Columns</p>
      <div className="flex gap-2">{([2, 3, 4] as const).map((n) => (<button key={n} onClick={() => onChange({ columns: n })} className={cn('flex-1 py-2 text-xs rounded border', content.columns === n ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{n}</button>))}</div></div>
      {(['showRole', 'showBio', 'showSocials'] as const).map((key) => (
        <label key={key} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={Boolean(content[key])} onChange={(e) => onChange({ [key]: e.target.checked })} className="accent-gold" />{key.replace(/([A-Z])/g, ' $1').trim()}</label>
      ))}
    </div>
  )
}

// ── Gallery Grid Panel ────────────────────────────────────────────────────────
interface GalleryProps { content: GalleryGridContent; onChange: (c: Partial<GalleryGridContent>) => void }
export function GalleryGridPanel({ content, onChange }: GalleryProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1"><p className="text-xs text-muted-foreground font-medium">Grid Style</p>
      <select value={content.gridStyle} onChange={(e) => onChange({ gridStyle: e.target.value as GalleryGridContent['gridStyle'] })} className="w-full px-2 py-1.5 border border-border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-gold">
        {['uniform', 'masonry', '2-col', '3-col', '4-col'].map((s) => <option key={s} value={s}>{s}</option>)}
      </select></div>
      <div className="space-y-1"><p className="text-xs text-muted-foreground font-medium">Aspect Ratio</p>
      <div className="flex flex-wrap gap-1">{(['square', '4:3', '16:9', 'auto'] as const).map((v) => (<button key={v} onClick={() => onChange({ aspectRatio: v })} className={cn('px-2 py-1 text-xs rounded border', content.aspectRatio === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{v}</button>))}</div></div>
      {(['lightboxOnClick', 'showCaptions'] as const).map((key) => (
        <label key={key} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={content[key]} onChange={(e) => onChange({ [key]: e.target.checked })} className="accent-gold" />{key === 'lightboxOnClick' ? 'Lightbox on click' : 'Show captions'}</label>
      ))}
    </div>
  )
}

// ── Video Embed Panel ─────────────────────────────────────────────────────────
interface VideoProps { content: VideoEmbedContent; onChange: (c: Partial<VideoEmbedContent>) => void }
export function VideoEmbedPanel({ content, onChange }: VideoProps) {
  return (
    <div className="space-y-4">
      <div><p className="text-xs text-muted-foreground font-medium mb-1">Video URL</p>
      <input type="url" value={content.videoUrl} onChange={(e) => onChange({ videoUrl: e.target.value })} placeholder="YouTube / Vimeo / MP4" className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold" /></div>
      <div className="space-y-1"><p className="text-xs text-muted-foreground font-medium">Aspect Ratio</p>
      <div className="flex gap-2">{(['16:9', '4:3', '1:1'] as const).map((v) => (<button key={v} onClick={() => onChange({ aspectRatio: v })} className={cn('flex-1 py-2 text-xs rounded border', content.aspectRatio === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{v}</button>))}</div></div>
      {(['autoplay', 'showControls'] as const).map((key) => (
        <label key={key} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={content[key]} onChange={(e) => onChange({ [key]: e.target.checked })} className="accent-gold" />{key === 'autoplay' ? 'Autoplay (muted)' : 'Show controls'}</label>
      ))}
    </div>
  )
}

// ── Collection Showcase Panel ─────────────────────────────────────────────────
interface CollectionProps { content: CollectionShowcaseContent; onChange: (c: Partial<CollectionShowcaseContent>) => void }
export function CollectionShowcasePanel({ content, onChange }: CollectionProps) {
  return (
    <div className="space-y-4">
      <div><p className="text-xs text-muted-foreground font-medium mb-1">Section Title</p>
      <input type="text" value={content.sectionTitle || ''} onChange={(e) => onChange({ sectionTitle: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none" /></div>
      <div className="space-y-1"><p className="text-xs text-muted-foreground font-medium">Layout</p>
      <div className="flex gap-1">{(['grid', 'featured', 'horizontal'] as const).map((v) => (<button key={v} onClick={() => onChange({ layout: v })} className={cn('flex-1 py-2 text-xs rounded border capitalize', content.layout === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{v}</button>))}</div></div>
    </div>
  )
}

// ── Category Grid Panel ───────────────────────────────────────────────────────
interface CategoryGridProps { content: CategoryGridContent; onChange: (c: Partial<CategoryGridContent>) => void }
export function CategoryGridPanel({ content, onChange }: CategoryGridProps) {
  return (
    <div className="space-y-4">
      <div><p className="text-xs text-muted-foreground font-medium mb-1">Section Title</p>
      <input type="text" value={content.sectionTitle || ''} onChange={(e) => onChange({ sectionTitle: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none" /></div>
      <div className="space-y-1"><p className="text-xs text-muted-foreground font-medium">Columns</p>
      <div className="flex gap-2">{([2, 3, 4] as const).map((n) => (<button key={n} onClick={() => onChange({ columns: n })} className={cn('flex-1 py-2 text-xs rounded border', content.columns === n ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{n}</button>))}</div></div>
      <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={content.showDescription} onChange={(e) => onChange({ showDescription: e.target.checked })} className="accent-gold" />Show descriptions</label>
    </div>
  )
}

// ── Custom HTML Panel ─────────────────────────────────────────────────────────
interface CustomHtmlProps { content: CustomHtmlContent; onChange: (c: Partial<CustomHtmlContent>) => void }
export function CustomHtmlPanel({ content, onChange }: CustomHtmlProps) {
  return (
    <div className="space-y-3">
      <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">⚠ Custom HTML is rendered as-is. Use with caution.</div>
      <div><p className="text-xs text-muted-foreground font-medium mb-1">HTML</p>
      <textarea value={content.html} onChange={(e) => onChange({ html: e.target.value })} rows={12} className="w-full px-3 py-2 border border-border rounded text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-gold resize-y" placeholder="<div>Your custom HTML here</div>" /></div>
    </div>
  )
}

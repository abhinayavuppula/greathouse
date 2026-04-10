import type { FeaturedProductsContent } from '@greathouses/shared-types'
import { cn } from '../../../lib/utils'

interface Props { content: FeaturedProductsContent; onChange: (c: Partial<FeaturedProductsContent>) => void }

const LAYOUTS: Array<{ value: FeaturedProductsContent['layout']; label: string }> = [
  { value: '2-col', label: '2 Col' },
  { value: '3-col', label: '3 Col' },
  { value: '4-col', label: '4 Col' },
  { value: 'scroll', label: 'Scroll' },
  { value: 'carousel', label: 'Carousel' },
]

export function FeaturedProductsPanel({ content, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">Section Title</p>
        <input type="text" value={content.sectionTitle || ''} onChange={(e) => onChange({ sectionTitle: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">Section Subtitle</p>
        <input type="text" value={content.sectionSubtitle || ''} onChange={(e) => onChange({ sectionSubtitle: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none" />
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Auto-select Products By</p>
        <select value={content.autoSelectBy || ''} onChange={(e) => onChange({ autoSelectBy: e.target.value as FeaturedProductsContent['autoSelectBy'] })} className="w-full px-2 py-1.5 border border-border rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-gold">
          <option value="">Manual selection</option>
          <option value="featured">Featured products</option>
          <option value="newArrival">New arrivals</option>
          <option value="category">By category</option>
          <option value="collection">By collection</option>
        </select>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Max Items</p>
        <input type="number" value={content.maxItems} onChange={(e) => onChange({ maxItems: parseInt(e.target.value) || 8 })} min={1} max={24} className="w-full px-2 py-1.5 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Layout</p>
        <div className="flex flex-wrap gap-1">
          {LAYOUTS.map(({ value, label }) => (
            <button key={value} onClick={() => onChange({ layout: value })} className={cn('px-2 py-1 text-xs rounded border', content.layout === value ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{label}</button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {(['showPrice', 'showInquiryButton'] as const).map((key) => (
          <label key={key} className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={content[key]} onChange={(e) => onChange({ [key]: e.target.checked })} className="accent-gold" />
            {key === 'showPrice' ? 'Show Price' : 'Show "Request Inquiry" button'}
          </label>
        ))}
      </div>
    </div>
  )
}

import { RichTextEditor } from '../shared/RichTextEditor'
import { ImagePickerField } from '../shared/ImagePickerField'
import { ColorPickerField } from '../shared/ColorPickerField'
import type { ImageTextSplitContent } from '@greathouses/shared-types'
import { cn } from '../../../lib/utils'

interface Props { content: ImageTextSplitContent; onChange: (c: Partial<ImageTextSplitContent>) => void }

export function ImageTextSplitPanel({ content, onChange }: Props) {
  return (
    <div className="space-y-4">
      <ImagePickerField label="Image" value={content.image} onChange={(v) => onChange({ image: v })} />

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Image Position</p>
        <div className="flex gap-2">
          {(['left', 'right'] as const).map((pos) => (
            <button key={pos} onClick={() => onChange({ imagePosition: pos })} className={cn('flex-1 py-2 text-xs rounded border capitalize font-medium', content.imagePosition === pos ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Aspect Ratio</p>
        <div className="flex flex-wrap gap-1">
          {(['square', '4:3', '16:9', 'portrait'] as const).map((ratio) => (
            <button key={ratio} onClick={() => onChange({ imageAspectRatio: ratio })} className={cn('px-2 py-1 text-xs rounded border', content.imageAspectRatio === ratio ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">Heading</p>
        <input type="text" value={content.heading} onChange={(e) => onChange({ heading: e.target.value })} placeholder="Section heading" className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold" />
      </div>

      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">Body</p>
        <RichTextEditor value={content.body} onChange={(v) => onChange({ body: v })} />
      </div>

      <div className="space-y-2 rounded-md border border-border p-3">
        <p className="text-xs font-semibold">CTA Button</p>
        <input type="text" value={content.cta?.label || ''} onChange={(e) => onChange({ cta: { ...content.cta, label: e.target.value, url: content.cta?.url || '', style: content.cta?.style || 'outline' } })} placeholder="Button label" className="w-full px-2 py-1.5 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
        <input type="text" value={content.cta?.url || ''} onChange={(e) => onChange({ cta: { ...content.cta, url: e.target.value, label: content.cta?.label || '', style: content.cta?.style || 'outline' } })} placeholder="/link" className="w-full px-2 py-1.5 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Vertical Alignment</p>
        <div className="flex gap-2">
          {(['top', 'center', 'bottom'] as const).map((v) => (
            <button key={v} onClick={() => onChange({ verticalAlign: v })} className={cn('flex-1 py-2 text-xs rounded border capitalize', content.verticalAlign === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

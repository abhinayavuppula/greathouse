import type { TextContent } from '@greathouses/shared-types'
import { RichTextEditor } from '../shared/RichTextEditor'
import { cn } from '../../../lib/utils'

interface Props { content: TextContent; onChange: (c: Partial<TextContent>) => void }

export function TextContentPanel({ content, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Content</p>
        <RichTextEditor value={content.richText} onChange={(v) => onChange({ richText: v })} placeholder="Write your content here…" />
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Max Width</p>
        <div className="flex flex-wrap gap-1">
          {(['640px', '768px', '1024px', 'full'] as const).map((w) => (
            <button key={w} onClick={() => onChange({ maxWidth: w })} className={cn('px-2 py-1 text-xs rounded border', content.maxWidth === w ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{w}</button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Text Align</p>
        <div className="flex gap-2">
          {(['left', 'center', 'right'] as const).map((a) => (
            <button key={a} onClick={() => onChange({ textAlign: a })} className={cn('flex-1 py-2 text-xs rounded border capitalize', content.textAlign === a ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

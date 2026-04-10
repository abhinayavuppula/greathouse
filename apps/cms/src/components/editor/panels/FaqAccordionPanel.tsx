import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { FaqAccordionContent, FaqItem } from '@greathouses/shared-types'
import { RichTextEditor } from '../shared/RichTextEditor'
import { cn } from '../../../lib/utils'

interface Props { content: FaqAccordionContent; onChange: (c: Partial<FaqAccordionContent>) => void }

export function FaqAccordionPanel({ content, onChange }: Props) {
  const [expanded, setExpanded] = useState<number | null>(0)

  function updateItem(index: number, update: Partial<FaqItem>) {
    const items = [...content.items]
    items[index] = { ...items[index], ...update }
    onChange({ items })
  }

  function addItem() {
    onChange({ items: [...content.items, { question: 'New Question', answer: '' }] })
    setExpanded(content.items.length)
  }

  function removeItem(index: number) {
    onChange({ items: content.items.filter((_, i) => i !== index) })
    setExpanded(null)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">Section Title</p>
        <input type="text" value={content.sectionTitle || ''} onChange={(e) => onChange({ sectionTitle: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">FAQ Items</p>
          <button onClick={addItem} className="text-xs flex items-center gap-1 text-gold hover:underline"><Plus size={12} /> Add FAQ</button>
        </div>
        {content.items.map((item, i) => (
          <div key={i} className="border border-border rounded-md overflow-hidden">
            <div className="flex items-center gap-2 p-2">
              <button onClick={() => setExpanded(expanded === i ? null : i)} className="flex-1 text-left text-xs font-medium truncate">{item.question || 'Untitled'}</button>
              <button onClick={() => removeItem(i)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"><Trash2 size={12} /></button>
            </div>
            {expanded === i && (
              <div className="border-t border-border p-2 space-y-2 bg-accent/20">
                <input type="text" value={item.question} onChange={(e) => updateItem(i, { question: e.target.value })} placeholder="Question" className="w-full px-2 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
                <RichTextEditor value={item.answer} onChange={(v) => updateItem(i, { answer: v })} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Layout</p>
        <div className="flex gap-2">
          {(['single', 'two-column'] as const).map((v) => (
            <button key={v} onClick={() => onChange({ layout: v })} className={cn('flex-1 py-2 text-xs rounded border capitalize', content.layout === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{v.replace('-', ' ')}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

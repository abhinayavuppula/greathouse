import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import type { StatsCounterContent, StatItem } from '@greathouses/shared-types'
import { cn } from '../../../lib/utils'

interface Props { content: StatsCounterContent; onChange: (c: Partial<StatsCounterContent>) => void }

export function StatsCounterPanel({ content, onChange }: Props) {
  function updateItem(index: number, update: Partial<StatItem>) {
    const items = [...content.items]
    items[index] = { ...items[index], ...update }
    onChange({ items })
  }

  function addItem() {
    onChange({ items: [...content.items, { number: '0', suffix: '+', label: 'New Stat' }] })
  }

  function removeItem(index: number) {
    onChange({ items: content.items.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-muted-foreground font-medium mb-1">Section Title</p>
        <input type="text" value={content.sectionTitle || ''} onChange={(e) => onChange({ sectionTitle: e.target.value })} className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Stats Items</p>
          <button onClick={addItem} className="text-xs flex items-center gap-1 text-gold hover:underline">
            <Plus size={12} /> Add Stat
          </button>
        </div>
        {content.items.map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-1 items-center">
            <input type="text" value={item.prefix || ''} onChange={(e) => updateItem(i, { prefix: e.target.value })} placeholder="Prefix" className="px-1.5 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
            <input type="text" value={item.number} onChange={(e) => updateItem(i, { number: e.target.value })} placeholder="25" className="px-1.5 py-1 border border-border rounded text-xs font-bold focus:outline-none focus:ring-1 focus:ring-gold" />
            <input type="text" value={item.suffix || ''} onChange={(e) => updateItem(i, { suffix: e.target.value })} placeholder="+" className="px-1.5 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
            <button onClick={() => removeItem(i)} className="p-1 text-muted-foreground hover:text-destructive transition-colors justify-self-end">
              <Trash2 size={12} />
            </button>
            <input type="text" value={item.label} onChange={(e) => updateItem(i, { label: e.target.value })} placeholder="Years of Craft" className="col-span-3 px-1.5 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={content.animatedCountUp} onChange={(e) => onChange({ animatedCountUp: e.target.checked })} id="animated" className="accent-gold" />
        <label htmlFor="animated" className="text-xs">Animated count-up</label>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium">Columns</p>
        <div className="flex gap-2">
          {([2, 3, 4] as const).map((n) => (
            <button key={n} onClick={() => onChange({ columns: n })} className={cn('flex-1 py-2 text-xs rounded border', content.columns === n ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{n}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

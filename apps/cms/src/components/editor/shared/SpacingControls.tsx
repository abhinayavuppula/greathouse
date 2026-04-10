import { cn } from '../../../lib/utils'

interface SpacingControlsProps {
  label?: string
  values: { top?: number; right?: number; bottom?: number; left?: number }
  onChange: (values: Record<string, number>) => void
  className?: string
}

export function SpacingControls({ label, values, onChange, className }: SpacingControlsProps) {
  const fields = [
    { key: 'top', label: 'T' },
    { key: 'right', label: 'R' },
    { key: 'bottom', label: 'B' },
    { key: 'left', label: 'L' },
  ] as const

  return (
    <div className={cn('space-y-1', className)}>
      {label && <p className="text-xs text-muted-foreground font-medium">{label}</p>}
      <div className="flex items-center gap-1">
        {fields.map(({ key, label: l }) => (
          <div key={key} className="flex-1">
            <p className="text-[10px] text-muted-foreground text-center mb-1">{l}</p>
            <input
              type="number"
              value={values[key] ?? 0}
              onChange={(e) => onChange({ ...values, [key]: parseInt(e.target.value, 10) || 0 })}
              min={0}
              max={400}
              step={4}
              className="w-full px-1 py-1 border border-border rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-gold bg-white"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

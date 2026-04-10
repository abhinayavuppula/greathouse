import { useState } from 'react'
import { cn } from '../../../lib/utils'

interface ColorPickerFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function ColorPickerField({ label, value, onChange, className }: ColorPickerFieldProps) {
  const [inputVal, setInputVal] = useState(value)

  function handleHexInput(hex: string) {
    setInputVal(hex)
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      onChange(hex)
    }
  }

  function handleColorPicker(color: string) {
    setInputVal(color)
    onChange(color)
  }

  return (
    <div className={cn('space-y-1', className)}>
      {label && <p className="text-xs text-muted-foreground font-medium">{label}</p>}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => handleColorPicker(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border border-border p-0.5 bg-white"
          />
        </div>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => handleHexInput(e.target.value)}
          onBlur={() => setInputVal(value)}
          placeholder="#1a1a1a"
          className="flex-1 px-2 py-1.5 border border-border rounded text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-gold"
        />
        <div
          className="w-7 h-7 rounded border border-border flex-shrink-0"
          style={{ backgroundColor: value || 'transparent' }}
        />
      </div>
    </div>
  )
}

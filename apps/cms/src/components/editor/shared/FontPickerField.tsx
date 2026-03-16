import { useState } from 'react'
import { cn } from '../../../lib/utils'

const GOOGLE_FONTS = [
  'Playfair Display', 'Cormorant Garamond', 'Lora', 'Crimson Text', 'EB Garamond',
  'Libre Baskerville', 'Merriweather', 'PT Serif', 'Spectral', 'Noto Serif',
  'Inter', 'Jost', 'Outfit', 'DM Sans', 'Plus Jakarta Sans',
  'Raleway', 'Montserrat', 'Poppins', 'Nunito', 'Rubik',
  'Josefin Sans', 'Cinzel', 'Tenor Sans', 'Manrope', 'Karla',
]

interface FontPickerFieldProps {
  label?: string
  value: string
  onChange: (font: string) => void
  className?: string
}

export function FontPickerField({ label, value, onChange, className }: FontPickerFieldProps) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filtered = search
    ? GOOGLE_FONTS.filter((f) => f.toLowerCase().includes(search.toLowerCase()))
    : GOOGLE_FONTS

  return (
    <div className={cn('space-y-1 relative', className)}>
      {label && <p className="text-xs text-muted-foreground font-medium">{label}</p>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-3 py-2 border border-border rounded text-sm bg-white hover:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
        style={{ fontFamily: value }}
      >
        {value || 'Select font…'}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-border rounded-md shadow-lg mt-1 overflow-hidden">
          <div className="p-2 border-b border-border">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fonts…"
              className="w-full px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-gold"
              autoFocus
            />
          </div>
          <ul className="max-h-48 overflow-y-auto py-1">
            {filtered.map((font) => (
              <li key={font}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(font)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors',
                    value === font && 'bg-gold/10 text-gold font-medium'
                  )}
                  style={{ fontFamily: font }}
                >
                  {font}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}

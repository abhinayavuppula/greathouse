import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { ColorPickerField } from '../../components/editor/shared/ColorPickerField'
import { FontPickerField } from '../../components/editor/shared/FontPickerField'
import { toast } from 'sonner'
import { cn } from '../../lib/utils'
import type { Theme } from '@greathouses/shared-types'

const SECTIONS = [
  { key: 'colors', label: '🎨 Colors' },
  { key: 'typography', label: '✏️ Typography' },
  { key: 'layout', label: '📐 Layout & Nav' },
  { key: 'custom', label: '⚙️ Custom CSS' },
] as const

function GoogleFontLoader({ fonts }: { fonts: string[] }) {
  const query = fonts.filter(Boolean).map((f) => `family=${f.replace(/ /g, '+')}`).join('&')
  return fonts.length > 0 ? (
    <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${query}&display=swap`} />
  ) : null
}

export default function ThemePage() {
  const [activeSection, setActiveSection] = useState<'colors' | 'typography' | 'layout' | 'custom'>('colors')
  const [saving, setSaving] = useState(false)
  const [resetting, setResetting] = useState(false)

  const { data: theme, refetch } = useQuery({
    queryKey: ['theme'],
    queryFn: async () => {
      const r = await api.get('/theme')
      return r.data.data as Theme
    },
  })

  const [draft, setDraft] = useState<Partial<Theme>>({})

  const current = { ...theme, ...draft } as Theme

  function update(key: keyof Theme, value: unknown) {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      await api.put('/theme', draft)
      setDraft({})
      refetch()
      toast.success('Theme saved successfully')
    } catch {
      toast.error('Failed to save theme')
    } finally {
      setSaving(false)
    }
  }

  async function handleReset() {
    if (!confirm('Reset theme to defaults? This cannot be undone.')) return
    setResetting(true)
    try {
      await api.post('/theme/reset')
      setDraft({})
      refetch()
      toast.success('Theme reset to defaults')
    } catch {
      toast.error('Failed to reset theme')
    } finally {
      setResetting(false)
    }
  }

  const isDirty = Object.keys(draft).length > 0

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <GoogleFontLoader fonts={[current.fontHeading, current.fontBody].filter(Boolean)} />
      <TopBar
        title="Theme Settings"
        subtitle="Customize global design tokens"
        actions={
          <div className="flex items-center gap-2">
            {isDirty && <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Unsaved changes</span>}
            <button onClick={handleReset} disabled={resetting} className="px-3 py-1.5 text-xs border border-border rounded text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
              {resetting ? 'Resetting…' : 'Reset Defaults'}
            </button>
            <button onClick={handleSave} disabled={saving || !isDirty} className="px-3 py-1.5 text-xs bg-gold text-white rounded font-semibold hover:bg-gold-dark transition-colors disabled:opacity-50">
              {saving ? 'Saving…' : 'Save Theme'}
            </button>
          </div>
        }
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-white border-r border-border py-3 flex-shrink-0">
          {SECTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={cn(
                'w-full text-left px-4 py-2.5 text-xs font-medium transition-colors',
                activeSection === key ? 'bg-gold/10 text-gold border-r-2 border-gold' : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl space-y-6">
            {activeSection === 'colors' && (
              <>
                <h2 className="text-sm font-semibold">Color Palette</h2>
                {[
                  { key: 'colorPrimary' as keyof Theme, label: 'Primary (Dark Background / Text)' },
                  { key: 'colorSecondary' as keyof Theme, label: 'Secondary (Gold Accent)' },
                  { key: 'colorAccent' as keyof Theme, label: 'Accent (Warm Cream)' },
                  { key: 'colorBackground' as keyof Theme, label: 'Page Background' },
                  { key: 'colorText' as keyof Theme, label: 'Body Text' },
                  { key: 'colorMuted' as keyof Theme, label: 'Muted Text' },
                  { key: 'colorBorder' as keyof Theme, label: 'Borders' },
                  { key: 'colorError' as keyof Theme, label: 'Error / Destructive' },
                ].map(({ key, label }) => (
                  <ColorPickerField key={key} label={label} value={(current[key] as string) || ''} onChange={(v) => update(key, v)} />
                ))}
              </>
            )}

            {activeSection === 'typography' && (
              <>
                <h2 className="text-sm font-semibold">Typography</h2>
                <FontPickerField label="Heading Font" value={current.fontHeading || ''} onChange={(v) => update('fontHeading', v)} />
                <FontPickerField label="Body Font" value={current.fontBody || ''} onChange={(v) => update('fontBody', v)} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Base Font Size (px)</p>
                    <input type="number" value={current.fontSizeBase || 16} onChange={(e) => update('fontSizeBase', parseInt(e.target.value))} min={12} max={24} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Line Height</p>
                    <input type="text" value={current.lineHeight || '1.6'} onChange={(e) => update('lineHeight', e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Letter Spacing</p>
                  <input type="text" value={current.letterSpacing || '0em'} onChange={(e) => update('letterSpacing', e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" placeholder="0em" />
                </div>

                {/* Preview */}
                <div className="p-6 border border-border rounded-lg bg-accent/20">
                  <p className="text-[10px] text-muted-foreground mb-3 uppercase tracking-wide">Font Preview</p>
                  <p style={{ fontFamily: current.fontHeading, fontSize: 28 }} className="text-foreground mb-2">Great Houses India</p>
                  <p style={{ fontFamily: current.fontBody, fontSize: current.fontSizeBase || 16, lineHeight: current.lineHeight || '1.6', letterSpacing: current.letterSpacing || '0em' }} className="text-muted-foreground">Crafted for the extraordinary. Every piece at Great Houses India is a testament to the legacy of Indian artisanship.</p>
                </div>
              </>
            )}

            {activeSection === 'layout' && (
              <>
                <h2 className="text-sm font-semibold">Layout & Navigation</h2>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Nav Style</p>
                  <div className="flex gap-2">
                    {(['fixed', 'sticky', 'static'] as const).map((v) => (
                      <button key={v} onClick={() => update('navStyle', v)} className={cn('flex-1 py-2 text-xs rounded border capitalize', current.navStyle === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{v}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ColorPickerField label="Nav Background" value={current.navBgColor || '#ffffff'} onChange={(v) => update('navBgColor', v)} />
                  <ColorPickerField label="Nav Text" value={current.navTextColor || '#1a1a1a'} onChange={(v) => update('navTextColor', v)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Nav Height (px)</p>
                    <input type="number" value={current.navHeight || 72} onChange={(e) => update('navHeight', parseInt(e.target.value))} min={48} max={120} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-1">Border Radius (px)</p>
                    <input type="text" value={current.borderRadius || '3px'} onChange={(e) => update('borderRadius', e.target.value)} className="w-full px-3 py-2 border border-border rounded text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Button Style</p>
                  <div className="flex gap-2">
                    {(['sharp', 'rounded', 'pill'] as const).map((v) => (
                      <button key={v} onClick={() => update('buttonStyle', v)} className={cn('flex-1 py-2 text-xs rounded border capitalize', current.buttonStyle === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>{v}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeSection === 'custom' && (
              <>
                <h2 className="text-sm font-semibold">Custom CSS</h2>
                <p className="text-xs text-muted-foreground">Injected into the frontend as a &lt;style&gt; tag. Overrides all theme variables.</p>
                <textarea
                  value={(current.customCSS as string) || ''}
                  onChange={(e) => update('customCSS', e.target.value)}
                  rows={20}
                  className="w-full px-3 py-2 border border-border rounded text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-gold resize-y"
                  placeholder="/* Custom CSS */&#10;.my-class { color: var(--color-secondary); }"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

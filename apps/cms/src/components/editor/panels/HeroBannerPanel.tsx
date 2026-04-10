import { ImagePickerField } from '../shared/ImagePickerField'
import { ColorPickerField } from '../shared/ColorPickerField'
import { RichTextEditor } from '../shared/RichTextEditor'
import type { HeroBannerContent, TextPosition, ButtonStyle } from '@greathouses/shared-types'
import { cn } from '../../../lib/utils'

interface HeroBannerPanelProps {
  content: HeroBannerContent
  onChange: (content: Partial<HeroBannerContent>) => void
}

const TEXT_POSITIONS: { value: TextPosition; label: string }[] = [
  { value: 'top-left', label: 'TL' },
  { value: 'top-center', label: 'TC' },
  { value: 'top-right', label: 'TR' },
  { value: 'middle-left', label: 'ML' },
  { value: 'middle-center', label: 'MC' },
  { value: 'middle-right', label: 'MR' },
  { value: 'bottom-left', label: 'BL' },
  { value: 'bottom-center', label: 'BC' },
  { value: 'bottom-right', label: 'BR' },
]

const BUTTON_STYLES: ButtonStyle[] = ['filled', 'outline', 'ghost', 'text']

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground font-medium mb-1">{children}</p>
}

function FieldGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-1', className)}>{children}</div>
}

function InputField({ value, onChange, placeholder, label, textarea }: {
  value: string; onChange: (v: string) => void; placeholder?: string; label?: string; textarea?: boolean
}) {
  return (
    <FieldGroup>
      {label && <FieldLabel>{label}</FieldLabel>}
      {textarea ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold resize-none"
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold"
        />
      )}
    </FieldGroup>
  )
}

function CTAButtons({ content, onChange }: { content: HeroBannerContent; onChange: (content: Partial<HeroBannerContent>) => void }) {
  return (
    <div className="space-y-3">
      {(['cta1', 'cta2'] as const).map((key, i) => {
        const cta = content[key]
        return (
          <div key={key} className="rounded-md border border-border p-3 space-y-2">
            <p className="text-xs font-semibold">CTA Button {i + 1}</p>
            <input
              type="text"
              value={cta?.label || ''}
              onChange={(e) => onChange({ [key]: { ...cta, label: e.target.value, url: cta?.url || '', style: cta?.style || 'filled' } })}
              placeholder="Button label"
              className="w-full px-2 py-1.5 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <input
              type="text"
              value={cta?.url || ''}
              onChange={(e) => onChange({ [key]: { ...cta, url: e.target.value, label: cta?.label || '', style: cta?.style || 'filled' } })}
              placeholder="/link-url"
              className="w-full px-2 py-1.5 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <div className="flex gap-1">
              {BUTTON_STYLES.map((style) => (
                <button
                  key={style}
                  onClick={() => onChange({ [key]: { ...cta, style, label: cta?.label || '', url: cta?.url || '' } })}
                  className={cn(
                    'px-2 py-1 text-[10px] rounded border capitalize',
                    cta?.style === style ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground'
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function HeroBannerPanel({ content, onChange }: HeroBannerPanelProps) {
  return (
    <div className="space-y-4">
      <InputField label="Headline" value={content.headline} onChange={(v) => onChange({ headline: v })} placeholder="Crafted for the Extraordinary" />
      <InputField label="Subheadline" value={content.subheadline || ''} onChange={(v) => onChange({ subheadline: v })} placeholder="Hero subtitle text" textarea />

      <div className="space-y-2">
        <FieldLabel>Background Type</FieldLabel>
        <div className="flex gap-2">
          {(['color', 'image', 'video'] as const).map((type) => (
            <button
              key={type}
              onClick={() => onChange({ backgroundType: type })}
              className={cn(
                'px-3 py-1.5 text-xs rounded border capitalize font-medium flex-1',
                content.backgroundType === type ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {content.backgroundType === 'color' && (
        <ColorPickerField label="Background Color" value={content.backgroundColor || '#1a1a1a'} onChange={(v) => onChange({ backgroundColor: v })} />
      )}

      {content.backgroundType === 'image' && (
        <>
          <ImagePickerField label="Background Image" value={content.backgroundImage || ''} onChange={(v) => onChange({ backgroundImage: v })} />
          <FieldGroup>
            <FieldLabel>Image Position</FieldLabel>
            <select
              value={content.backgroundImagePosition || 'center center'}
              onChange={(e) => onChange({ backgroundImagePosition: e.target.value })}
              className="w-full px-2 py-1.5 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold bg-white"
            >
              <option>center center</option>
              <option>top center</option>
              <option>bottom center</option>
              <option>center left</option>
              <option>center right</option>
            </select>
          </FieldGroup>
        </>
      )}

      {content.backgroundType === 'video' && (
        <InputField label="Video URL (YouTube/Vimeo/MP4)" value={content.backgroundVideoUrl || ''} onChange={(v) => onChange({ backgroundVideoUrl: v })} placeholder="https://..." />
      )}

      <div className="space-y-2">
        <FieldLabel>Overlay</FieldLabel>
        <ColorPickerField label="Overlay Color" value={content.overlayColor || '#000000'} onChange={(v) => onChange({ overlayColor: v })} />
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Opacity: {content.overlayOpacity ?? 50}%</p>
          <input type="range" min={0} max={80} value={content.overlayOpacity ?? 50} onChange={(e) => onChange({ overlayOpacity: parseInt(e.target.value) })} className="w-full accent-gold" />
        </div>
      </div>

      <div className="space-y-2">
        <FieldLabel>Text Position</FieldLabel>
        <div className="grid grid-cols-3 gap-1">
          {TEXT_POSITIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange({ textPosition: value })}
              className={cn(
                'py-2 text-[10px] rounded border font-mono',
                content.textPosition === value ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <FieldLabel>Min Height</FieldLabel>
        <select
          value={content.minHeight || '100vh'}
          onChange={(e) => onChange({ minHeight: e.target.value })}
          className="w-full px-2 py-1.5 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold bg-white"
        >
          <option value="400px">400px</option>
          <option value="500px">500px</option>
          <option value="60vh">60vh</option>
          <option value="75vh">75vh</option>
          <option value="85vh">85vh</option>
          <option value="100vh">100vh (Full Screen)</option>
        </select>
      </div>

      <ColorPickerField label="Text Color" value={content.textColor || '#ffffff'} onChange={(v) => onChange({ textColor: v })} />

      <div>
        <FieldLabel>CTA Buttons</FieldLabel>
        <CTAButtons content={content} onChange={onChange} />
      </div>
    </div>
  )
}

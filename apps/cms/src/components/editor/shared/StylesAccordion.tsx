import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ColorPickerField } from './ColorPickerField'
import { SpacingControls } from './SpacingControls'
import { FontPickerField } from './FontPickerField'
import { ImagePickerField } from './ImagePickerField'
import { cn } from '../../../lib/utils'
import type { SectionStyles } from '@greathouses/shared-types'

interface StylesAccordionProps {
  styles: SectionStyles
  onStylesChange: (styles: Partial<SectionStyles>) => void
}

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2.5 px-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
      >
        {title}
        <ChevronDown size={12} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="pb-4 space-y-3 px-1">{children}</div>}
    </div>
  )
}

export function StylesAccordion({ styles, onStylesChange }: StylesAccordionProps) {
  function update(partial: Partial<SectionStyles>) {
    onStylesChange({ ...styles, ...partial })
  }

  return (
    <div className="space-y-0">
      <AccordionSection title="Background" defaultOpen>
        <div className="space-y-2">
          <div className="flex gap-2">
            <button onClick={() => update({ backgroundImage: undefined })} className={cn('px-2 py-1 text-xs rounded border transition-colors', !styles.backgroundImage ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground')}>Color</button>
            <button onClick={() => {}} className="px-2 py-1 text-xs rounded border border-border text-muted-foreground">Gradient</button>
            <button onClick={() => {}} className="px-2 py-1 text-xs rounded border border-border text-muted-foreground">Image</button>
          </div>
          <ColorPickerField
            label="Background Color"
            value={styles.backgroundColor || '#ffffff'}
            onChange={(v) => update({ backgroundColor: v })}
          />
          <ImagePickerField
            label="Background Image"
            value={styles.backgroundImage || ''}
            onChange={(v) => update({ backgroundImage: v })}
          />
          {styles.backgroundImage && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Opacity</p>
              <input
                type="range"
                min={0} max={100}
                value={styles.backgroundOpacity ?? 100}
                onChange={(e) => update({ backgroundOpacity: parseInt(e.target.value) })}
                className="w-full accent-gold"
              />
              <p className="text-xs text-muted-foreground text-right">{styles.backgroundOpacity ?? 100}%</p>
            </div>
          )}
        </div>
      </AccordionSection>

      <AccordionSection title="Spacing">
        <SpacingControls
          label="Padding (px)"
          values={{
            top: styles.paddingTop,
            right: styles.paddingRight,
            bottom: styles.paddingBottom,
            left: styles.paddingLeft,
          }}
          onChange={(v) => update({
            paddingTop: v.top,
            paddingRight: v.right,
            paddingBottom: v.bottom,
            paddingLeft: v.left,
          })}
        />
      </AccordionSection>

      <AccordionSection title="Typography">
        <ColorPickerField
          label="Text Color"
          value={styles.textColor || ''}
          onChange={(v) => update({ textColor: v })}
        />
        <FontPickerField
          label="Override Heading Font"
          value={styles.headingFontOverride || ''}
          onChange={(v) => update({ headingFontOverride: v })}
        />
        <FontPickerField
          label="Override Body Font"
          value={styles.bodyFontOverride || ''}
          onChange={(v) => update({ bodyFontOverride: v })}
        />
      </AccordionSection>

      <AccordionSection title="Border">
        <div className="space-y-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Corner Radius (px)</p>
            <input
              type="range"
              min={0} max={48}
              value={styles.borderRadius ?? 0}
              onChange={(e) => update({ borderRadius: parseInt(e.target.value) })}
              className="w-full accent-gold"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={styles.borderWidth ?? 0}
              onChange={(e) => update({ borderWidth: parseInt(e.target.value) || 0 })}
              min={0} max={8}
              className="w-16 px-2 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <span className="text-xs text-muted-foreground">px width</span>
          </div>
          {(styles.borderWidth ?? 0) > 0 && (
            <ColorPickerField
              label="Border Color"
              value={styles.borderColor || '#e5e7eb'}
              onChange={(v) => update({ borderColor: v })}
            />
          )}
        </div>
      </AccordionSection>

      <AccordionSection title="Advanced">
        <div className="space-y-2">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Custom CSS Class</p>
            <input
              type="text"
              value={styles.customClass || ''}
              onChange={(e) => update({ customClass: e.target.value })}
              placeholder="my-custom-class"
              className="w-full px-2 py-1 border border-border rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">Hide on</p>
            <div className="flex gap-2">
              {(['hideOnMobile', 'hideOnTablet', 'hideOnDesktop'] as const).map((key) => (
                <label key={key} className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={styles[key] ?? false}
                    onChange={(e) => update({ [key]: e.target.checked })}
                    className="accent-gold"
                  />
                  {key.replace('hideOn', '')}
                </label>
              ))}
            </div>
          </div>
        </div>
      </AccordionSection>
    </div>
  )
}

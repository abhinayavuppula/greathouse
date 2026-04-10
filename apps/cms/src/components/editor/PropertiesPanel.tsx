import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'
import { ChevronLeft, Eye, EyeOff } from 'lucide-react'
import { useEditorStore, getSelectedSection } from '../../../store/editorStore'
import { api } from '../../../lib/api'
import { toast } from 'sonner'
import { StylesAccordion } from '../shared/StylesAccordion'
import { HeroBannerPanel } from '../panels/HeroBannerPanel'
import { ImageTextSplitPanel } from '../panels/ImageTextSplitPanel'
import { TextContentPanel } from '../panels/TextContentPanel'
import { FeaturedProductsPanel } from '../panels/FeaturedProductsPanel'
import { StatsCounterPanel } from '../panels/StatsCounterPanel'
import { FaqAccordionPanel } from '../panels/FaqAccordionPanel'
import { NewsletterPanel } from '../panels/NewsletterPanel'
import {
  TestimonialsPanel,
  TeamGridPanel,
  GalleryGridPanel,
  VideoEmbedPanel,
  CollectionShowcasePanel,
  CategoryGridPanel,
  CustomHtmlPanel,
  ContactFormPanel,
} from '../panels/AdditionalPanels'
import { cn } from '../../../lib/utils'
import type { SectionType } from '@greathouses/shared-types'

function SectionPanelContent({ section }: { section: ReturnType<typeof getSelectedSection> & object }) {
  const { updateSectionContent } = useEditorStore()

  function onChange(partial: Record<string, unknown>) {
    updateSectionContent(section.id, partial)
  }

  const content = (section.content ?? {}) as Record<string, unknown>

  switch (section.type as SectionType) {
    case 'HERO_BANNER': return <HeroBannerPanel content={content as Parameters<typeof HeroBannerPanel>[0]['content']} onChange={onChange as Parameters<typeof HeroBannerPanel>[0]['onChange']} />
    case 'IMAGE_TEXT_SPLIT': return <ImageTextSplitPanel content={content as Parameters<typeof ImageTextSplitPanel>[0]['content']} onChange={onChange as Parameters<typeof ImageTextSplitPanel>[0]['onChange']} />
    case 'TEXT_CONTENT': return <TextContentPanel content={content as Parameters<typeof TextContentPanel>[0]['content']} onChange={onChange as Parameters<typeof TextContentPanel>[0]['onChange']} />
    case 'FEATURED_PRODUCTS': return <FeaturedProductsPanel content={content as Parameters<typeof FeaturedProductsPanel>[0]['content']} onChange={onChange as Parameters<typeof FeaturedProductsPanel>[0]['onChange']} />
    case 'STATS_COUNTER': return <StatsCounterPanel content={content as Parameters<typeof StatsCounterPanel>[0]['content']} onChange={onChange as Parameters<typeof StatsCounterPanel>[0]['onChange']} />
    case 'FAQ_ACCORDION': return <FaqAccordionPanel content={content as Parameters<typeof FaqAccordionPanel>[0]['content']} onChange={onChange as Parameters<typeof FaqAccordionPanel>[0]['onChange']} />
    case 'NEWSLETTER_SIGNUP': return <NewsletterPanel content={content as Parameters<typeof NewsletterPanel>[0]['content']} onChange={onChange as Parameters<typeof NewsletterPanel>[0]['onChange']} />
    case 'TESTIMONIALS_CAROUSEL': return <TestimonialsPanel content={content as Parameters<typeof TestimonialsPanel>[0]['content']} onChange={onChange as Parameters<typeof TestimonialsPanel>[0]['onChange']} />
    case 'TEAM_GRID': return <TeamGridPanel content={content as Parameters<typeof TeamGridPanel>[0]['content']} onChange={onChange as Parameters<typeof TeamGridPanel>[0]['onChange']} />
    case 'GALLERY_GRID': return <GalleryGridPanel content={content as Parameters<typeof GalleryGridPanel>[0]['content']} onChange={onChange as Parameters<typeof GalleryGridPanel>[0]['onChange']} />
    case 'VIDEO_EMBED': return <VideoEmbedPanel content={content as Parameters<typeof VideoEmbedPanel>[0]['content']} onChange={onChange as Parameters<typeof VideoEmbedPanel>[0]['onChange']} />
    case 'COLLECTION_SHOWCASE': return <CollectionShowcasePanel content={content as Parameters<typeof CollectionShowcasePanel>[0]['content']} onChange={onChange as Parameters<typeof CollectionShowcasePanel>[0]['onChange']} />
    case 'CATEGORY_GRID': return <CategoryGridPanel content={content as Parameters<typeof CategoryGridPanel>[0]['content']} onChange={onChange as Parameters<typeof CategoryGridPanel>[0]['onChange']} />
    case 'CONTACT_FORM': return <ContactFormPanel content={content as Parameters<typeof ContactFormPanel>[0]['content']} onChange={onChange as Parameters<typeof ContactFormPanel>[0]['onChange']} />
    case 'CUSTOM_HTML': return <CustomHtmlPanel content={content as Parameters<typeof CustomHtmlPanel>[0]['content']} onChange={onChange as Parameters<typeof CustomHtmlPanel>[0]['onChange']} />
    default: return <p className="text-xs text-muted-foreground p-4">Unknown section type: {section.type}</p>
  }
}

export function PropertiesPanel() {
  const { selectedSectionId, sections, updateSectionStyles, updateSectionContent, setDirty } = useEditorStore()
  const section = getSelectedSection({ selectedSectionId, sections } as Parameters<typeof getSelectedSection>[0])
  const [saving, setSaving] = useState(false)

  if (!section) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-3">
          <ChevronLeft size={20} className="text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">Select a section</p>
        <p className="text-xs mt-1">to edit its properties</p>
      </div>
    )
  }

  async function handleSave() {
    if (!section) return
    setSaving(true)
    try {
      await api.put(`/sections/${section.id}`, {
        content: section.content,
        styles: section.styles,
      })
      setDirty(false)
      toast.success('Section saved')
    } catch {
      toast.error('Failed to save section')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Section label editor */}
      <div className="px-4 py-3 border-b border-border">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1 font-medium">Section Label</p>
        <input
          type="text"
          value={section.label || ''}
          onChange={(e) => updateSectionContent(section.id, { _label: e.target.value })}
          placeholder="Add a label…"
          className="w-full px-2 py-1 border border-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-gold bg-white"
        />
      </div>

      <Tabs defaultValue="content" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="flex border-b border-border bg-transparent px-4 py-0 gap-1">
          {[['content', 'Content'], ['styles', 'Styles']].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                'px-3 py-2 text-xs font-medium border-b-2 transition-colors -mb-px',
                'data-[state=active]:border-gold data-[state=active]:text-foreground',
                'data-[state=inactive]:border-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground'
              )}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="content" className="flex-1 overflow-y-auto p-4 panel-enter">
          <SectionPanelContent section={section as NonNullable<typeof section>} />
        </TabsContent>

        <TabsContent value="styles" className="flex-1 overflow-y-auto p-4 panel-enter">
          <StylesAccordion
            styles={(section.styles ?? {}) as Parameters<typeof StylesAccordion>[0]['styles']}
            onStylesChange={(styles) => updateSectionStyles(section.id, styles as Record<string, unknown>)}
          />
        </TabsContent>
      </Tabs>

      {/* Save button */}
      <div className="px-4 py-3 border-t border-border flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 py-2 bg-gold text-white rounded text-xs font-semibold hover:bg-gold-dark disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving…' : 'Save Section'}
        </button>
      </div>
    </div>
  )
}

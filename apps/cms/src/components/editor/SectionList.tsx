import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  Plus,
  ChevronRight,
} from 'lucide-react'
import { useEditorStore } from '../../../store/editorStore'
import { api } from '../../../lib/api'
import { toast } from 'sonner'
import { cn } from '../../../lib/utils'
import type { Section, SectionType } from '@greathouses/shared-types'

const SECTION_TYPES: Array<{ type: SectionType; label: string; icon: string }> = [
  { type: 'HERO_BANNER', label: 'Hero Banner', icon: '🖼' },
  { type: 'IMAGE_TEXT_SPLIT', label: 'Image & Text', icon: '⬛' },
  { type: 'TEXT_CONTENT', label: 'Text Block', icon: '📝' },
  { type: 'FEATURED_PRODUCTS', label: 'Featured Products', icon: '🏛' },
  { type: 'TESTIMONIALS_CAROUSEL', label: 'Testimonials', icon: '💬' },
  { type: 'STATS_COUNTER', label: 'Stats Counter', icon: '📊' },
  { type: 'TEAM_GRID', label: 'Team Grid', icon: '👥' },
  { type: 'GALLERY_GRID', label: 'Gallery Grid', icon: '🖼' },
  { type: 'NEWSLETTER_SIGNUP', label: 'Newsletter', icon: '✉️' },
  { type: 'FAQ_ACCORDION', label: 'FAQ', icon: '❓' },
  { type: 'VIDEO_EMBED', label: 'Video', icon: '🎬' },
  { type: 'COLLECTION_SHOWCASE', label: 'Collections', icon: '🗂' },
  { type: 'CATEGORY_GRID', label: 'Categories', icon: '📦' },
  { type: 'CONTACT_FORM', label: 'Contact Form', icon: '📨' },
  { type: 'CUSTOM_HTML', label: 'Custom HTML', icon: '</>' },
]

function SectionTypeLabel({ type }: { type: SectionType }) {
  const info = SECTION_TYPES.find((s) => s.type === type)
  return (
    <span className="text-xs">{info?.icon} {info?.label ?? type}</span>
  )
}

interface SortableSectionItemProps {
  section: Section
  isSelected: boolean
  onSelect: () => void
}

function SortableSectionItem({ section, isSelected, onSelect }: SortableSectionItemProps) {
  const { addSection, removeSection, setSections, sections } = useEditorStore()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  async function handleToggleVisible() {
    try {
      await api.put(`/sections/${section.id}`, { visible: !section.visible })
      setSections(sections.map((s) => s.id === section.id ? { ...s, visible: !s.visible } : s))
    } catch {
      toast.error('Failed to toggle visibility')
    }
  }

  async function handleDuplicate() {
    try {
      const res = await api.post(`/sections/${section.id}/duplicate`)
      addSection(res.data.data)
      toast.success('Section duplicated')
    } catch {
      toast.error('Failed to duplicate section')
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this section?')) return
    try {
      await api.delete(`/sections/${section.id}`)
      removeSection(section.id)
      toast.success('Section deleted')
    } catch {
      toast.error('Failed to delete section')
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group flex items-center gap-2 px-3 py-2.5 rounded-md border cursor-pointer transition-all',
        isSelected
          ? 'bg-gold/10 border-gold shadow-sm'
          : 'bg-white border-border hover:border-gold/50 hover:shadow-sm'
      )}
      onClick={onSelect}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={14} />
      </button>

      <div className="flex-1 min-w-0">
        {section.label ? (
          <div>
            <p className="text-xs font-medium truncate text-foreground">{section.label}</p>
            <SectionTypeLabel type={section.type} />
          </div>
        ) : (
          <SectionTypeLabel type={section.type} />
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); handleToggleVisible() }}
          className="p-1 text-muted-foreground hover:text-foreground rounded"
          title={section.visible ? 'Hide' : 'Show'}
        >
          {section.visible ? <Eye size={12} /> : <EyeOff size={12} className="text-muted-foreground/50" />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDuplicate() }}
          className="p-1 text-muted-foreground hover:text-foreground rounded"
          title="Duplicate"
        >
          <Copy size={12} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDelete() }}
          className="p-1 text-muted-foreground hover:text-destructive transition-colors rounded"
          title="Delete"
        >
          <Trash2 size={12} />
        </button>
      </div>

      {isSelected && <ChevronRight size={12} className="text-gold flex-shrink-0" />}
    </div>
  )
}

interface AddSectionSheetProps {
  pageId: string
  onAdd: (section: Section) => void
}

function AddSectionSheet({ pageId, onAdd }: AddSectionSheetProps) {
  const [open, setOpen] = useState(false)
  const [adding, setAdding] = useState<SectionType | null>(null)
  const { sections } = useEditorStore()

  async function addSection(type: SectionType) {
    setAdding(type)
    try {
      const defaultContent = getDefaultContent(type)
      const res = await api.post('/sections', {
        pageId,
        type,
        label: SECTION_TYPES.find((s) => s.type === type)?.label,
        sortOrder: sections.length,
        visible: true,
        content: defaultContent,
        styles: {},
      })
      onAdd(res.data.data)
      setOpen(false)
      toast.success('Section added')
    } catch {
      toast.error('Failed to add section')
    } finally {
      setAdding(null)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border rounded-md text-muted-foreground hover:text-gold hover:border-gold transition-colors text-xs"
      >
        <Plus size={13} /> Add Section
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-border rounded-md shadow-lg z-10 overflow-hidden">
          <div className="px-3 py-2 border-b border-border">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Choose Section Type</p>
          </div>
          <div className="max-h-64 overflow-y-auto py-1">
            {SECTION_TYPES.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => addSection(type)}
                disabled={adding !== null}
                className="w-full text-left px-3 py-2 text-xs hover:bg-accent flex items-center gap-2 transition-colors"
              >
                <span>{icon}</span>
                <span className="font-medium">{label}</span>
                {adding === type && <span className="ml-auto text-muted-foreground">Adding…</span>}
              </button>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none" onClick={() => setOpen(false)} />
        </div>
      )}
      {open && <div className="fixed inset-0 z-[9]" onClick={() => setOpen(false)} />}
    </div>
  )
}

function getDefaultContent(type: SectionType): Record<string, unknown> {
  const defaults: Partial<Record<SectionType, Record<string, unknown>>> = {
    HERO_BANNER: { headline: 'New Headline', backgroundType: 'color', backgroundColor: '#1a1a1a', textColor: '#ffffff', overlayOpacity: 50, textPosition: 'middle-center', minHeight: '85vh' },
    IMAGE_TEXT_SPLIT: { heading: 'Section Heading', body: '<p>Describe your content here.</p>', imagePosition: 'left', imageAspectRatio: 'square', image: '', verticalAlign: 'center' },
    TEXT_CONTENT: { richText: '<p>Write your content here.</p>', textAlign: 'left', maxWidth: '768px' },
    FEATURED_PRODUCTS: { sectionTitle: 'Featured Pieces', layout: '3-col', maxItems: 6, showPrice: true, showInquiryButton: false },
    TESTIMONIALS_CAROUSEL: { layout: 'carousel', showAllFeatured: true, showAvatar: true, showRating: true, showCompany: true, autoplay: false, autoplayInterval: 5 },
    STATS_COUNTER: { items: [{ number: '500', suffix: '+', label: 'Pieces Crafted' }, { number: '25', label: 'Years of Legacy' }], animatedCountUp: true, columns: 3 },
    TEAM_GRID: { showAllVisible: true, columns: 3, showRole: true, showBio: false, showSocials: true },
    NEWSLETTER_SIGNUP: { headline: 'Join the Circle', subtext: 'Be the first to discover new collections', placeholder: 'Your email address', buttonLabel: 'Subscribe' },
    FAQ_ACCORDION: { sectionTitle: 'Frequently Asked Questions', items: [], layout: 'single' },
    VIDEO_EMBED: { videoUrl: '', aspectRatio: '16:9', autoplay: false, showControls: true },
    GALLERY_GRID: { images: [], gridStyle: 'uniform', aspectRatio: 'square', lightboxOnClick: true, showCaptions: false },
    CONTACT_FORM: { headline: 'Get in Touch', subtext: '', buttonLabel: 'Send Message' } as Record<string, unknown>,
    CATEGORY_GRID: { sectionTitle: 'Explore Categories', columns: 3, showAllVisible: true, showDescription: false },
    COLLECTION_SHOWCASE: { sectionTitle: 'Our Collections', layout: 'grid' },
    CUSTOM_HTML: { html: '<!-- Custom HTML -->' },
  }
  return defaults[type] ?? {}
}

export { SECTION_TYPES, AddSectionSheet, getDefaultContent }

interface SectionListProps {
  pageId: string
}

export function SectionList({ pageId }: SectionListProps) {
  const { sections, setSections, selectSection, selectedSectionId, addSection, reorderSections } = useEditorStore()
  const [dragActive, setDragActive] = useState<Section | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragStart(event: DragStartEvent) {
    const sec = sections.find((s) => s.id === event.active.id)
    if (sec) setDragActive(sec)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setDragActive(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = sections.findIndex((s) => s.id === active.id)
    const newIndex = sections.findIndex((s) => s.id === over.id)
    const reordered = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({ ...s, sortOrder: i }))
    reorderSections(reordered)

    try {
      await api.put('/sections/reorder', reordered.map((s) => ({ id: s.id, sortOrder: s.sortOrder })))
    } catch {
      toast.error('Failed to save order')
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {sections.map((section) => (
            <SortableSectionItem
              key={section.id}
              section={section}
              isSelected={selectedSectionId === section.id}
              onSelect={() => selectSection(section.id)}
            />
          ))}
        </SortableContext>

        {sections.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            <p>No sections yet.</p>
            <p className="text-xs mt-1">Add your first section below.</p>
          </div>
        )}
      </div>

      <div className="px-3 pb-3">
        <AddSectionSheet pageId={pageId} onAdd={addSection} />
      </div>

      <DragOverlay>
        {dragActive && (
          <div className="drag-overlay flex items-center gap-2 px-3 py-2.5 rounded-md border border-gold bg-gold/10 text-sm">
            <GripVertical size={14} />
            <SectionTypeLabel type={dragActive.type} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}

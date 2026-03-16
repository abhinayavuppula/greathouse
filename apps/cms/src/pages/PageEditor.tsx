import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { useEditorStore } from '../../store/editorStore'
import { SectionList } from '../../components/editor/SectionList'
import { PropertiesPanel } from '../../components/editor/PropertiesPanel'
import { LivePreview } from '../../components/editor/LivePreview'
import { toast } from 'sonner'
import { Save, Globe, EyeOff, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import type { Page, Section } from '@greathouses/shared-types'

export default function PageEditor() {
  const { pageId } = useParams<{ pageId: string }>()
  const navigate = useNavigate()
  const { setActivePage, setSections, isDirty, reset } = useEditorStore()

  const { data, isLoading } = useQuery({
    queryKey: ['page', pageId],
    queryFn: async () => {
      const res = await api.get(`/pages/${pageId}`)
      return res.data.data as Page & { sections: Section[] }
    },
    enabled: !!pageId,
  })

  useEffect(() => {
    if (data) {
      setActivePage(data)
      setSections(data.sections ?? [])
    }
    return () => reset()
  }, [data])

  async function handlePublish() {
    if (!pageId) return
    try {
      await api.patch(`/pages/${pageId}/publish`)
      toast.success(data?.published ? 'Page unpublished' : 'Page published')
    } catch {
      toast.error('Failed to toggle publish')
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading page editor…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Editor header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-white border-b border-border flex-shrink-0">
        <Link to="/pages" className="p-1.5 text-muted-foreground hover:text-foreground rounded transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{data?.title || 'Page Editor'}</p>
          <p className="text-[11px] text-muted-foreground">/{data?.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          {isDirty && (
            <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
              Unsaved changes
            </span>
          )}
          <button
            onClick={handlePublish}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors',
              data?.published
                ? 'bg-accent text-muted-foreground hover:text-foreground'
                : 'bg-gold text-white hover:bg-gold-dark'
            )}
          >
            {data?.published ? <><EyeOff size={13} /> Unpublish</> : <><Globe size={13} /> Publish</>}
          </button>
        </div>
      </div>

      {/* 3-panel layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Section list */}
        <div className="w-[240px] flex-shrink-0 border-r border-border bg-white flex flex-col overflow-hidden">
          <div className="px-3 py-2.5 border-b border-border">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Sections</p>
          </div>
          <SectionList pageId={pageId!} />
        </div>

        {/* Center: Preview */}
        <LivePreview />

        {/* Right: Properties panel */}
        <div className="w-[280px] flex-shrink-0 border-l border-border bg-white flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Properties</p>
          </div>
          <PropertiesPanel />
        </div>
      </div>
    </div>
  )
}

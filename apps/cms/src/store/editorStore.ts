import { create } from 'zustand'
import type { Page, Section, SectionType } from '@greathouses/shared-types'

interface EditorState {
  activePage: Page | null
  sections: Section[]
  selectedSectionId: string | null
  isDirty: boolean
  isSaving: boolean
  previewDevice: 'desktop' | 'tablet' | 'mobile'

  setActivePage: (page: Page) => void
  setSections: (sections: Section[]) => void
  selectSection: (id: string | null) => void
  updateSectionContent: (id: string, content: Record<string, unknown>) => void
  updateSectionStyles: (id: string, styles: Record<string, unknown>) => void
  reorderSections: (sections: Section[]) => void
  addSection: (section: Section) => void
  removeSection: (id: string) => void
  setDirty: (isDirty: boolean) => void
  setSaving: (isSaving: boolean) => void
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void
  reset: () => void
}

export const useEditorStore = create<EditorState>()((set, get) => ({
  activePage: null,
  sections: [],
  selectedSectionId: null,
  isDirty: false,
  isSaving: false,
  previewDevice: 'desktop',

  setActivePage: (page) => set({ activePage: page, isDirty: false }),

  setSections: (sections) => set({ sections }),

  selectSection: (id) => set({ selectedSectionId: id }),

  updateSectionContent: (id, content) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, content: { ...s.content as Record<string, unknown>, ...content } } : s
      ),
      isDirty: true,
    })),

  updateSectionStyles: (id, styles) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, styles: { ...s.styles as Record<string, unknown>, ...styles } } : s
      ),
      isDirty: true,
    })),

  reorderSections: (sections) => set({ sections, isDirty: true }),

  addSection: (section) =>
    set((state) => ({ sections: [...state.sections, section], isDirty: true })),

  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
      isDirty: true,
    })),

  setDirty: (isDirty) => set({ isDirty }),
  setSaving: (isSaving) => set({ isSaving }),
  setPreviewDevice: (device) => set({ previewDevice: device }),

  reset: () =>
    set({
      activePage: null,
      sections: [],
      selectedSectionId: null,
      isDirty: false,
      isSaving: false,
    }),
}))

export const getSelectedSection = (state: EditorState): Section | null => {
  if (!state.selectedSectionId) return null
  return state.sections.find((s) => s.id === state.selectedSectionId) ?? null
}

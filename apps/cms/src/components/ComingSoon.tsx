// Stub pages for remaining CMS routes
// These will be expanded in future development iterations

import { TopBar } from '../components/layout/TopBar'

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title={title} />
      <div className="flex-1 flex items-center justify-center text-center">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <p className="text-foreground font-medium text-sm">{title}</p>
          <p className="text-muted-foreground text-xs mt-1">Full implementation coming in the next phase</p>
        </div>
      </div>
    </div>
  )
}

export { ComingSoon }

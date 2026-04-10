import type { NewsletterSignupContent } from '@greathouses/shared-types'

interface Props { content: NewsletterSignupContent; onChange: (c: Partial<NewsletterSignupContent>) => void }

export function NewsletterPanel({ content, onChange }: Props) {
  return (
    <div className="space-y-4">
      {(['headline', 'subtext', 'placeholder', 'buttonLabel'] as const).map((key) => (
        <div key={key}>
          <p className="text-xs text-muted-foreground font-medium mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
          <input
            type="text"
            value={content[key] || ''}
            onChange={(e) => onChange({ [key]: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded text-sm bg-white focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      ))}
    </div>
  )
}

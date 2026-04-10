import slugifyLib from 'slugify'

export function slugify(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  })
}

export function generateUniqueSlug(base: string, suffix?: string | number): string {
  const slug = slugify(base)
  if (suffix !== undefined) {
    return `${slug}-${suffix}`
  }
  return slug
}

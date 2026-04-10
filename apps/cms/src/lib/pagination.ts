// Simple pagination helper for CMS pages
export function parsePagination(query: Record<string, unknown>) {
  const page = Math.max(1, parseInt(String(query.page ?? 1)) || 1)
  const limit = Math.max(1, parseInt(String(query.limit ?? 20)) || 20)
  return { page, limit }
}

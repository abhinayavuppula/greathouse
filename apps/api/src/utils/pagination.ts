export interface PaginationInput {
  page?: number | string
  limit?: number | string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function parsePagination(input: PaginationInput, defaultLimit = 12, maxLimit = 100) {
  const page = Math.max(1, parseInt(String(input.page ?? 1), 10) || 1)
  const limit = Math.min(maxLimit, Math.max(1, parseInt(String(input.limit ?? defaultLimit), 10) || defaultLimit))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function buildMeta(total: number, page: number, limit: number): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

import { FastifyInstance } from 'fastify'

export function createCacheService(fastify: FastifyInstance) {
  const redis = fastify.redis

  async function get<T>(key: string): Promise<T | null> {
    try {
      const raw = await redis.get(key)
      if (!raw) return null
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  }

  async function set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value))
    } catch {
      // Redis failure is non-fatal
    }
  }

  async function del(...keys: string[]): Promise<void> {
    try {
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch {
      // Redis failure is non-fatal
    }
  }

  async function delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch {
      // Redis failure is non-fatal
    }
  }

  return { get, set, del, delPattern }
}

// Cache key helpers
export const CacheKeys = {
  theme: 'theme:active',
  settings: 'settings:public',
  page: (slug: string) => `page:${slug}`,
  products: (params: string) => `products:${params}`,
  categories: 'categories:tree',
  collections: 'collections:all',
  collection: (slug: string) => `collection:${slug}`,
  testimonials: 'testimonials:featured',
  team: 'team:visible',
}

// Cache TTLs in seconds
export const TTL = {
  theme: 3600,          // 1 hour
  settings: 3600,       // 1 hour
  page: 300,            // 5 minutes
  products: 120,        // 2 minutes
  categories: 600,      // 10 minutes
  collections: 300,     // 5 minutes
  testimonials: 600,    // 10 minutes
  team: 600,            // 10 minutes
}

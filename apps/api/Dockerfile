# Monorepo-aware Dockerfile for GreatHouses API
FROM node:20-alpine AS builder
WORKDIR /app

# Copy root package.json and lockfile
COPY package*.json ./
# Copy workspace packages
COPY packages/shared-types ./packages/shared-types
# Copy api app
COPY apps/api ./apps/api

# Install dependencies from root
RUN npm install

# Build shared-types first
RUN npm run build --workspace=@greathouses/shared-types

# Generate Prisma client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build the API
RUN npm run build

# --- Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built assets and dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

EXPOSE 3001

WORKDIR /app/apps/api
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]

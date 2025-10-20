# Base image (LTS + alpine)
FROM gcr.io/library/node:20-alpine AS base

# Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build:ci
RUN echo "===== LIST .next/standalone =====" && ls -al .next/standalone
RUN echo "===== LIST build =====" && ls -al build

# Runner stage (production)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create system group is named "nodejs", with GID = 1001
# Create system user is named "nextjs", with UID = 1001,
# This "nextjs" user is belong to "nodejs" group
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Set correct permission for new user
# Copy only build output
COPY --from=builder --chown=nextjs:nodejs /app/build ./

#Switch to user non-root
USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node","server.js"]
# ─────────────────────────────────────────────
# Stage 1: deps — install ALL dependencies
# ─────────────────────────────────────────────
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --ignore-scripts

# ─────────────────────────────────────────────
# Stage 2: build — compile TypeScript
# ─────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ─────────────────────────────────────────────
# Stage 3: production — lean runtime image
# ─────────────────────────────────────────────
FROM node:22-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

# Install only production dependencies in a clean layer
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Copy compiled output from builder
COPY --from=builder /app/dist ./dist

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api || exit 1

CMD ["node", "dist/main"]

# ─────────────────────────────────────────────
# Stage 4: development — hot-reload with source
# ─────────────────────────────────────────────
FROM node:22-alpine AS development

ENV NODE_ENV=development

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Run backend + frontend --
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV FRONTEND_PORT=3000
ENV BACKEND_PORT=3001

COPY --from=builder /app ./

RUN npm install -g concurrently

EXPOSE 3001
EXPOSE 3000

# Run backend and frontend concurrently
CMD ["concurrently", "node lib/index.js", "npm start"]

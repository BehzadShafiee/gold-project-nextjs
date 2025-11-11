# --- Stage 1: Build Next.js app ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your app
COPY . .

# Build Next.js for production
RUN npm run build


# --- Stage 2: Run backend + frontend ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy everything from the builder stage
COPY --from=builder /app ./

# Install concurrently to run both backend and frontend together
RUN npm install -g concurrently

# Expose both ports
EXPOSE 3000
EXPOSE 8800

# Start both services (backend and frontend)
CMD ["concurrently", "node lib/index.js", "npm start"]

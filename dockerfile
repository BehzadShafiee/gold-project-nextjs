# Stage 1: Build both backend and frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all code
COPY . .

# Build frontend (Next.js) if applicable
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV FRONTEND_PORT=3000
ENV BACKEND_PORT=3001

# Copy built app from builder
COPY --from=builder /app ./

# Install concurrently to run both backend and frontend
RUN npm install -g concurrently

# Expose ports for backend and frontend
EXPOSE 3001
EXPOSE 3000

# Run backend and frontend concurrently
CMD ["concurrently", "--kill-others-on-fail", "node lib/index.js", "npm start -- -p 3000"]

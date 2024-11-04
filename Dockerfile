# Backend Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

# Install additional dependencies for bcrypt
RUN apk add --no-cache python3 make g++ 

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install runtime dependencies for bcrypt
RUN apk add --no-cache python3 make g++

# Copy built assets and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]


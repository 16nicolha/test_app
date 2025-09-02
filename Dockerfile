# Use official Node image
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copy frontend source code (src + public)
COPY frontend ./

# Build the frontend
RUN npm run build

# -----------------------
# Backend build stage
# -----------------------
FROM node:18

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source code
COPY backend ./backend

# Copy frontend build output from first stage
COPY --from=build /app/frontend/build ./frontend/build

# Expose port (Cloud Run will use this)
EXPOSE 8080

# Start the backend
CMD ["node", "backend/server.js"]

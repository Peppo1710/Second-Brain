# Base image
FROM node:18-bullseye

# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Install PM2 globally
RUN npm install -g pm2

# Set workdir
WORKDIR /app

# Copy backend dependencies first (for caching)
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend code
COPY backend ./backend

# Copy Nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for Railway
EXPOSE 8080

# Start Nginx + backend
CMD service nginx start && pm2-runtime backend/ecosystem.config.js

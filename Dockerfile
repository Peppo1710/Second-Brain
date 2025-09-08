# Base image
FROM node:18-bullseye

# Install nginx and supervisor
RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    rm -rf /var/lib/apt/lists/*

# Install PM2 globally
RUN npm install -g pm2

# Set workdir
WORKDIR /app

# Copy backend dependencies first (for caching)
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Debugging 
RUN ls -la /app && ls -la /



# Copy backend code
COPY backend/ ./backend/

# # Copy .env explicitly (optional if already inside backend)
# COPY backend/.env ./backend/.env

# Copy Nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy supervisord config
COPY supervisor/supervisord.conf /app/supervisor/supervisord.conf

# Expose port 8080 for Railway
EXPOSE 8080

# Start both Nginx + Node using supervisord
CMD ["/usr/bin/supervisord", "-c", "/app/supervisor/supervisord.conf"]

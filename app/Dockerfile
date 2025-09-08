# Base image
FROM node:18-bullseye

# Debug: Show what files Railway can see
RUN echo "=== CHECKING BUILD CONTEXT ==="
COPY . /tmp/debug
RUN ls -la /tmp/debug
RUN ls -la /tmp/debug/../backend || echo "NO BACKEND FOLDER FOUND"

# Install nginx and supervisor
RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    rm -rf /var/lib/apt/lists/*

# Install PM2 globally
RUN npm install -g pm2

# Set workdir
WORKDIR /app

# Copy backend dependencies first (for caching) - go up one level
COPY ../backend/package*.json ./backend/
RUN cd backend && npm install --production

# Debugging 
RUN ls -la /app && ls -la /

# Copy backend code - go up one level
COPY ../backend/ ./backend/

# Copy Nginx config - go up one level  
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf

# Copy supervisord config - go up one level
COPY ../supervisor/supervisord.conf /app/supervisor/supervisord.conf

# Expose port 8080 for Railway
EXPOSE 8080

# Start both Nginx + Node using supervisord
CMD ["/usr/bin/supervisord", "-c", "/app/supervisor/supervisord.conf"]
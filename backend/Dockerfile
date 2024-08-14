# Dockerfile

FROM node:18-alpine

# Install curl
RUN apk add --no-cache curl && \
    apk add --no-cache --virtual .build-deps alpine-sdk && \
    apk add --no-cache inotify-tools

# Set working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --quiet

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
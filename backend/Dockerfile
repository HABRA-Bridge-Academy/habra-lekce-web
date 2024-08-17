# Use the official Node.js image (Debian-based)
FROM node:18

# Install dependencies for sharp, including libvips
RUN apt-get update && \
    apt-get install -y \
    curl \
    inotify-tools \
    libvips-dev \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN chown root.root .
# Install dependencies
RUN npm ci --quiet --platform=linux --arch=arm64

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]

# Use Node.js image as the base
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the lockfile and package.json files
COPY ./pnpm-lock.yaml ./package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the port the frontend (web) will run on
EXPOSE 3000

# Command to run the web application
CMD ["pnpm", "run", "dev"]
# Use Node.js image as the base
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the lockfile and package.json files
COPY ./pnpm-lock.yaml ./package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application
COPY . .

# Expose the port the frontend (web) will run on
EXPOSE 3000

# Command to run the web application
CMD ["pnpm", "run", "dev"]

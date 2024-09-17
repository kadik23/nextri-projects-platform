# Use specific Node.js version as build argument
ARG NODE_VERSION=20.5.1
FROM node:${NODE_VERSION}-alpine

# Set the PNPM version as a build argument
ARG PNPM_VERSION=9.9.0

# Install pnpm globally with the specified version
RUN npm install -g pnpm@${PNPM_VERSION}

# Set working directory
WORKDIR /app

# Copy lockfile and package.json files
COPY ./pnpm-lock.yaml ./package.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the API will run on
EXPOSE 3001

# Start the API with nodemon for file watching
CMD ["pnpm", "run", "dev"]
# Dockerfile for Web
ARG NODE_VERSION=20.5.1
FROM node:${NODE_VERSION}-alpine

ARG PNPM_VERSION=9.9.0

RUN npm install -g pnpm@${PNPM_VERSION} turbo

WORKDIR /app




# Copy the entire monorepo to the container's /app directory
COPY . .

# Install dependencies using pnpm
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]

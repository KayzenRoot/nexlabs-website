FROM node:22-bookworm-slim

ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_DOCKER_DEV=1

WORKDIR /app

# Keep application files and generated Next.js output writable by the node user.
RUN chown node:node /app
USER node

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

COPY --chown=node:node . .
RUN mkdir -p .next

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--webpack", "--hostname", "0.0.0.0", "--port", "3000"]

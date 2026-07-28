FROM node:22-alpine AS deps

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

FROM node:22-alpine AS runner

RUN apk add --no-cache tini curl

RUN addgroup -S berot && adduser -S berot -G berot

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY package.json .sequelizerc ./
COPY server.js ./
COPY config/ ./config/
COPY models/ ./models/
COPY controllers/ ./controllers/
COPY routes/ ./routes/
COPY middlewares/ ./middlewares/
COPY database/ ./database/
COPY migrations/ ./migrations/
COPY seeders/ ./seeders/

RUN mkdir -p uploads && chown -R berot:berot /app

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER berot

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:4000/api/health || exit 1

ENTRYPOINT ["tini", "--", "docker-entrypoint.sh"]
CMD ["node", "server.js"]

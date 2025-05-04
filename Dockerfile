FROM node:22.14 AS builder

WORKDIR /app/frontend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.14-alpine AS runner

WORKDIR /app/frontend

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

EXPOSE 3000

CMD ["npm", "start"]

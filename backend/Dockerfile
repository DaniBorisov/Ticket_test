FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npx ts-node prisma/seed.ts && node dist/server.js"]
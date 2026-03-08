FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 5000

# CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/server.js"] was this

# CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npx prisma db seed && node dist/server.js"] it was expectin that

# CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && ts-node prisma/seed.ts && node dist/server.js"] gave me new  no-ts error 

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && npx ts-node prisma/seed.ts && node dist/server.js"]
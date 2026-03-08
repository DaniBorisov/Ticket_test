import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  const userPassword = await bcrypt.hash("user123", 10);
  const handlerPassword = await bcrypt.hash("handler123", 10);

  const user = await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {
      password: userPassword,
      role: "USER",
    },
    create: {
      email: "user@test.com",
      password: userPassword,
      role: "USER",
    },
  });

  console.log("Seeded user:", user.email, user.role);

  const handler = await prisma.user.upsert({
    where: { email: "handler@test.com" },
    update: {
      password: handlerPassword,
      role: "HANDLER",
    },
    create: {
      email: "handler@test.com",
      password: handlerPassword,
      role: "HANDLER",
    },
  });

  console.log("Seeded handler:", handler.email, handler.role);
  console.log("Seed finished.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      { email: "user@test.com", password, role: "USER" },
      { email: "handler@test.com", password, role: "HANDLER" }
    ],
    skipDuplicates: true
  });

  console.log("Seeded predefined users");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
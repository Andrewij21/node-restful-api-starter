import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.info("seeding database...");

  const hashedPassword = await bcrypt.hash("password", 10);
  // Use upsert to create or update users
  const user = await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: { password: hashedPassword, role: "user" },
    create: {
      email: "user@gmail.com",
      password: hashedPassword,
      role: "user",
      contact: "1234567890",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: { password: hashedPassword, role: "admin" },
    create: {
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      contact: "1234567890",
    },
  });

  console.info(`Upserted user with ID: ${user.id}`);
  console.info(`Upserted admin with ID: ${admin.id}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

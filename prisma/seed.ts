import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.loja.createMany({
    skipDuplicates: true,
    data: [
      { nome: "Oba Centro" },
      { nome: "Oba Norte" },
      { nome: "Oba Sul" },
      { nome: "Oba Campinas" },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

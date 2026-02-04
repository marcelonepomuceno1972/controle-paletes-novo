import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.loja.createMany({
    skipDuplicates: true,
    data: [
      { digito: 1, nome: "Oba Centro" },
      { digito: 2, nome: "Oba Norte" },
      { digito: 3, nome: "Oba Sul" },
      { digito: 4, nome: "Oba Campinas" },
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

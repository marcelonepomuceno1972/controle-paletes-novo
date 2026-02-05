import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.loja.createMany({
    data: [
      { nome: "Carolina" },
      { nome: "Ponte Preta" },
      { nome: "Bonfim" },
      { nome: "Amoreiras" }
      // depois você pode completar
    ],
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

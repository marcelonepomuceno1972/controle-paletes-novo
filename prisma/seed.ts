import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.loja.createMany({
    skipDuplicates: true,
    data: [
      { codigo: "01", nome: "Oba Centro" },
      { codigo: "02", nome: "Oba Norte" },
      { codigo: "03", nome: "Oba Sul" },
      { codigo: "04", nome: "Oba Campinas" },
      { codigo: "05", nome: "Oba Jundiaí" }
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

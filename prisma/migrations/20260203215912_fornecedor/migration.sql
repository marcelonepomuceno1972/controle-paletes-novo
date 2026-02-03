-- AlterTable
ALTER TABLE "Movimentacao" ADD COLUMN "fornecedor" TEXT;
ALTER TABLE "Movimentacao" ADD COLUMN "observacoes" TEXT;

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_nome_key" ON "Fornecedor"("nome");

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Area" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_nome_key" ON "Fornecedor"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Area_nome_key" ON "Area"("nome");

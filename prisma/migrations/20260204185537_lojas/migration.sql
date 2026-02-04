-- CreateTable
CREATE TABLE "Loja" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Loja_codigo_key" ON "Loja"("codigo");

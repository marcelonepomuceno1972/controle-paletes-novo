-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoOperacao" TEXT NOT NULL,
    "areaOrigem" TEXT,
    "areaDestino" TEXT,
    "tipoPalete" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

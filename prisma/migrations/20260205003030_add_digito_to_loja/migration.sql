/*
  Migration corrigida manualmente para tabela já populada
*/

-- 1️⃣ Adiciona a coluna SEM NOT NULL
ALTER TABLE "Loja"
ADD COLUMN "digito" INTEGER;

-- 2️⃣ Preenche o digito usando o id existente (garante unicidade)
UPDATE "Loja"
SET "digito" = id
WHERE "digito" IS NULL;

-- 3️⃣ Agora sim torna NOT NULL
ALTER TABLE "Loja"
ALTER COLUMN "digito" SET NOT NULL;

-- 4️⃣ Cria índice único
CREATE UNIQUE INDEX "Loja_digito_key" ON "Loja"("digito");

-- 5️⃣ Remove codigo somente no final
DROP INDEX IF EXISTS "Loja_codigo_key";
ALTER TABLE "Loja" DROP COLUMN IF EXISTS "codigo";

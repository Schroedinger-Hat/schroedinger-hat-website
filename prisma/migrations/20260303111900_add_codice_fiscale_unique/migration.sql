-- DropIndex (regular index replaced by unique index below)
DROP INDEX "Member_codiceFiscale_idx";

-- CreateIndex (unique)
CREATE UNIQUE INDEX "Member_codiceFiscale_key" ON "Member"("codiceFiscale");

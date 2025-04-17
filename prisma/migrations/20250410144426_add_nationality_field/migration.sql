/*
  Warnings:

  - Added a nullable column `nationality` to the `Member` table that will later be made non-nullable.

*/
-- AlterTable
-- Step 1: Add the nationality column as nullable
ALTER TABLE "Member" ADD COLUMN "nationality" TEXT;

-- Step 2: Update existing records with a default value ("Unknown")
UPDATE "Member" SET "nationality" = 'Unknown' WHERE "nationality" IS NULL;

-- Step 3: Make the nationality column non-nullable
ALTER TABLE "Member" ALTER COLUMN "nationality" SET NOT NULL;

-- Make codiceFiscale nullable
ALTER TABLE "Member" ALTER COLUMN "codiceFiscale" DROP NOT NULL;

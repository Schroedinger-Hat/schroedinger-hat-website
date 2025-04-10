/*
  Warnings:

  - Added the required column `nationality` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "nationality" TEXT NOT NULL,
ALTER COLUMN "codiceFiscale" DROP NOT NULL;

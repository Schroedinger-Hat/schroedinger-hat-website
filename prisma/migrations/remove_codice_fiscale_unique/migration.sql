-- Remove unique constraint from codiceFiscale field in Member table
ALTER TABLE "Member" DROP CONSTRAINT IF EXISTS "Member_codiceFiscale_key"; 
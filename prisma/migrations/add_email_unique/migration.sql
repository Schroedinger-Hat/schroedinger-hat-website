-- Add unique constraint to email field in Member table
ALTER TABLE "Member" ADD CONSTRAINT "Member_email_key" UNIQUE ("email"); 
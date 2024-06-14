/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- Add the password column with a default value for existing rows
ALTER TABLE "User" ADD COLUMN "password" TEXT DEFAULT 'default_password';

-- Remove the default value constraint
ALTER TABLE "User" ALTER COLUMN "password" DROP DEFAULT;


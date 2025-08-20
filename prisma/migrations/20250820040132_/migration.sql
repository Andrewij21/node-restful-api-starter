/*
  Warnings:

  - Added the required column `contact` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "contact" TEXT NOT NULL;

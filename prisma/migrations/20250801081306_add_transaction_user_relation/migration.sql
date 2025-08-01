/*
  Warnings:

  - You are about to drop the column `userid` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionid` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `namewallet` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userid_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userid";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "transactionid",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "namewallet" TEXT NOT NULL,
ALTER COLUMN "totalbalance" SET DATA TYPE DOUBLE PRECISION;

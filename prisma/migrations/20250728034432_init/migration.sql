-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userpassword" TEXT NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "walletid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "totalbalance" INTEGER NOT NULL,
    "transactionid" INTEGER,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("walletid")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "transactionid" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "walletid" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_walletid_fkey" FOREIGN KEY ("walletid") REFERENCES "Wallet"("walletid") ON DELETE RESTRICT ON UPDATE CASCADE;

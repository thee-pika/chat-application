/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupMember` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `groupChat` on the `Chat` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "groupChat",
ADD COLUMN     "groupChat" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "chatId" DROP DEFAULT,
ALTER COLUMN "content" DROP DEFAULT,
ALTER COLUMN "userId" DROP DEFAULT;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "GroupMember";

-- DropEnum
DROP TYPE "ChatType";

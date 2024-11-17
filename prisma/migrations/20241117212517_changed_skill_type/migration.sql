/*
  Warnings:

  - You are about to drop the `_ProjectToSkill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToSkill" DROP CONSTRAINT "_ProjectToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToSkill" DROP CONSTRAINT "_ProjectToSkill_B_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "skills" TEXT;

-- DropTable
DROP TABLE "_ProjectToSkill";

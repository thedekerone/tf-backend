-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "maxMembers" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "category" DROP NOT NULL;

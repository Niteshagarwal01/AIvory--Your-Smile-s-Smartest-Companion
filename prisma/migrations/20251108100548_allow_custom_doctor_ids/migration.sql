-- AlterTable
ALTER TABLE "public"."doctors" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "gender" SET DEFAULT 'MALE';

-- AlterTable
ALTER TABLE "public"."Prompt" ADD COLUMN     "forkedFromId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Prompt" ADD CONSTRAINT "Prompt_forkedFromId_fkey" FOREIGN KEY ("forkedFromId") REFERENCES "public"."Prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_deckId_fkey";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

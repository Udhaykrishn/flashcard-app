import { Module } from "@nestjs/common";
import { DeckService } from "./decks.service";
import { DeckController } from "./decks.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DeckService],
  controllers: [DeckController],
})
export class DeckModule {}

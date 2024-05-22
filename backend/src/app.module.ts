import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { DeckModule } from "./decks/decks.module";
import { ConfigModule } from "@nestjs/config";
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    DeckModule,
    QuestionModule,
  ],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { DeckModule } from "./decks/decks.module";
import { ConfigModule } from "@nestjs/config";
import { QuestionModule } from "./question/question.module";
import { JwtModule } from "@nestjs/jwt";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    DeckModule,
    QuestionModule,
    ProfileModule,
  ],
})
export class AppModule {}

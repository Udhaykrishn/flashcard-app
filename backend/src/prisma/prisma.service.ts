import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>("DATABASE_URL"),
        },
      },
    });
  }
  cleanDB() {
    return this.$transaction([this.user.deleteMany()]);
  }
}
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Deck, Prisma } from "@prisma/client";

@Injectable()
export class DeckService {
  constructor(private prisma: PrismaService) {}

  async createDeck(
    data: Omit<Prisma.DeckCreateInput, "owner">,
    userId: number
  ): Promise<Deck> {
    return this.prisma.deck.create({
      data: {
        ...data,
        owner: { connect: { id: userId } },
      },
    });
  }

  async getDecksByUser(userId: number): Promise<Deck[]> {
    return this.prisma.deck.findMany({
      where: { ownerId: userId },
      include: { questions: true },
    });
  }

  async getDeckById(userId: number, deckId: number) {
    return this.prisma.deck.findFirst({
      where: { ownerId: userId, id: deckId },
    });
  }

  async updateDeck(
    deckId: number,
    data: Prisma.DeckUpdateInput
  ): Promise<Deck> {
    return this.prisma.deck.update({
      where: { id: deckId },
      data,
    });
  }
 
  async deleteDeck(deckId: number): Promise<Deck> {
    try {
      return this.prisma.deck.delete({
        where: { id: deckId },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

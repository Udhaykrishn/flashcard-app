// question.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(
    data: Omit<Prisma.QuestionCreateInput, 'deck'>,
    deckId: number,
  ): Promise<Question> {
    return this.prisma.question.create({
      data: {
        ...data,
        deck: { connect: { id: deckId } },
      },
    });
  }

  async getQuestionsByDeck(deckId: number): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: { deckId },
    });
  }

  async updateQuestion(
    questionId: number,
    data: Prisma.QuestionUpdateInput,
  ): Promise<Question> {
    return this.prisma.question.update({
      where: { id: questionId },
      data,
    });
  }

  async deleteQuestion(questionId: number): Promise<Question> {
    return this.prisma.question.delete({
      where: { id: questionId },
    });
  }
}
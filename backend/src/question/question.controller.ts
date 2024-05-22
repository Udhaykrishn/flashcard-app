// question.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { JwtAuthGuard } from "../auth/guard";
import { CreateQuestionDto, UpdateQuestionDto } from "./dto";

@Controller("questions")
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post(":deckId")
  async createQuestion(
    @Param("deckId") deckId: string,
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    return this.questionService.createQuestion(createQuestionDto, +deckId);
  }

  @Get(":deckId")
  async getQuestionsByDeck(@Param("deckId") deckId: string) {
    return this.questionService.getQuestionsByDeck(+deckId);
  }

  @Patch(":questionId")
  async updateQuestion(
    @Param("questionId") questionId: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.updateQuestion(+questionId, updateQuestionDto);
  }

  @Delete(":questionId")
  async deleteQuestion(@Param("questionId") questionId: string) {
    return this.questionService.deleteQuestion(+questionId);
  }
}

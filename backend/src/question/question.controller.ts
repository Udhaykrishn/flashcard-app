// question.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body() createQuestionDto: CreateQuestionDto
  ) {
    return this.questionService.createQuestion(createQuestionDto, deckId);
  }

  @Get(":deckId")
  async getQuestionsByDeck(@Param("deckId", ParseIntPipe) deckId: number) {
    return this.questionService.getQuestionsByDeck(deckId);
  }

  @Get(":questionId/deck/:deckId")
  async getQuestionByQuestionId(
    @Param("questionId", ParseIntPipe) questionId: number,
    @Param("deckId", ParseIntPipe) deckId: number
  ) {
    return this.questionService.getQuestionByQuestionId(questionId, deckId);
  }

  @Patch(":questionId")
  async updateQuestion(
    @Param("questionId", ParseIntPipe) questionId: number,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionService.updateQuestion(questionId, updateQuestionDto);
  }

  @Delete(":questionId")
  async deleteQuestion(@Param("questionId", ParseIntPipe) questionId: number) {
    return this.questionService.deleteQuestion(questionId);
  }
}

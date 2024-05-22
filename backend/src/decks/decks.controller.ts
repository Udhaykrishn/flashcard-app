import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { DeckService } from "./decks.service";
import { JwtAuthGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { CreateDeckDto, UpdateDeckDto } from "./dto";

@Controller("decks")
@UseGuards(JwtAuthGuard)
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  async createDeck(
    @Body() createDeckDto: CreateDeckDto,
    @GetUser() user: User
  ) {
    return this.deckService.createDeck(createDeckDto, user.id);
  }

  @Get()
  async getDecksByUser(@GetUser() user: User) {
    return this.deckService.getDecksByUser(user.id);
  }

  @Put(":deckId")
  async updateDeck(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body() updateDeckDto: UpdateDeckDto
  ) {
    return this.deckService.updateDeck(+deckId, updateDeckDto);
  }

  @Delete(":deckId")
  async deleteDeck(@Param("deckId",ParseIntPipe) deckId: number) {
    return this.deckService.deleteDeck(+deckId);
  }
}

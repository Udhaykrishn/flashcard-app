import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createDeck(
    @Body() createDeckDto: CreateDeckDto,
    @GetUser() user: User
  ) {
    return this.deckService.createDeck(createDeckDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getDecksByUser(@GetUser() user: User) {
    return this.deckService.getDecksByUser(user.id);
  }

  @Put(":deckId")
  @UseGuards(JwtAuthGuard)
  async updateDeck(
    @Param("deckId") deckId: string,
    @Body() updateDeckDto: UpdateDeckDto
  ) {
    return this.deckService.updateDeck(+deckId, updateDeckDto);
  }

  @Delete(":deckId")
  @UseGuards(JwtAuthGuard)
  async deleteDeck(@Param("deckId") deckId: string) {
    return this.deckService.deleteDeck(+deckId);
  }
}

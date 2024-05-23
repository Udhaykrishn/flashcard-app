import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "argon2";
import { SignupDto, LoginDto } from "./dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
    const { name, email, password } = signupDto;
    try {
      const hashedPassword = await bcrypt.hash(password);
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const access_token = this.jwtService.sign({ userId: user.id });
      return { access_token };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Email already exists");
        }
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    console.log(loginDto);
    const { email, password } = loginDto;
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      console.log("Retrieved user:", user);

      const isPasswordValid = await bcrypt.verify(user.password, password);
      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid password");
      }

      const access_token = this.jwtService.sign({ userId: user.id });
      return { access_token };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }

  profile() {}
}

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "argon2";
import { SignupDto, LoginDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
    const { name, email, password } = signupDto;
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
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const access_token = this.jwtService.sign({ userId: user.id });
    return { access_token };
  }
}

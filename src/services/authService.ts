import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async login(email: string, password: string): Promise<string | null> {
    const user = await UserRepository.findOneBy({ email });

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Senha inválida!");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    return token;
  }

  static async register(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = UserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await UserRepository.save(newUser);
  }
}

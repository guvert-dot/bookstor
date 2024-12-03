import { Request, Response } from "express";
import { AuthService } from ../services/authService";;

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      await AuthService.register(name, email, password);
      res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

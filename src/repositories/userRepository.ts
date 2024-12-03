import { AppDataSource } from "../database/connection";
import { User } from "../models/User";

export const UserRepository = AppDataSource.getRepository(User);

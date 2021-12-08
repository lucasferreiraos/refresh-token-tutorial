import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";

export default class CreateUserController {
  async handle(request: Request, response: Response){
    const { name, username, password } = request.body;

    const service = new CreateUserService();

    const user = await service.execute({
      name,
      username,
      password
    });

    return response.json(user);
  };
};
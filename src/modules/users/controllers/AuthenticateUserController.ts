import { Request, Response } from "express";
import AuthenticateUserService from "../services/AuthenticateUserService";

export default class AuthenticateUserController{
  async handle(request: Request, response: Response){
    const { username, password } = request.body;

    const service = new AuthenticateUserService();

    const token = await service.execute({
      username,
      password
    });

    return response.json(token);
  };
};
import { Request, Response } from "express";
import RefreshTokenUserService from "../services/RefreshTokenUserService";

export default class RefreshTokenUserController{
  async handle(request: Request, response: Response){
    const { refreshToken } = request.body;

    const service = new RefreshTokenUserService();

    const token = await service.execute(refreshToken);

    return response.json(token);
  };
};
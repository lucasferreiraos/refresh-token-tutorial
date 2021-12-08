import dayjs from "dayjs";
import prisma from "../prisma";

export default class GenerateRefreshTokenProvider{
  async execute(userId: string){
    const expiresIn = dayjs().add(15, "second").unix();

    const refreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    });

    return refreshToken;
  };
};

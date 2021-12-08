import prisma from "../../../prisma";
import GenerateTokenProvider from "../../../providers/GenerateTokenProvider";

export default class RefreshTokenUserService{
  async execute(refreshToken: string){
    const refreshTokenObj = await prisma.refreshToken.findFirst({
      where: {
        id: refreshToken
      }
    });

    if(!refreshTokenObj) throw new Error("Refresh token invalid");

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshTokenObj.userId);

    return { token };
  };
};
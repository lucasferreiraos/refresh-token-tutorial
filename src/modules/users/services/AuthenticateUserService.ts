import { compare } from "bcryptjs";
import prisma from "../../../prisma";
import GenerateRefreshTokenProvider from "../../../providers/GenerateRefreshTokenProvider";
import GenerateTokerProvider from "../../../providers/GenerateTokenProvider";

interface IAuthenticateUser {
  username: string,
  password: string
};

export default class AuthenticateUserService{
  async execute({ username, password }: IAuthenticateUser){
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (!userAlreadyExists) throw new Error("User or password incorrect!");
    
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) throw new Error("User or password incorrect!");

    const generateTokenRrovider = new GenerateTokerProvider();
    const token = await generateTokenRrovider.execute(userAlreadyExists.id);

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
    const refreshToken = await generateRefreshTokenProvider.execute(userAlreadyExists.id);

    return { token, refreshToken };

  };
};
import { sign } from "jsonwebtoken";

export default class GenerateTokenProvider{
  async execute(userId: string) {
    const token = sign({}, process.env.AUTH_KEY, {
      subject: userId,
      expiresIn: "20s"
    });

    return token;
  };
};
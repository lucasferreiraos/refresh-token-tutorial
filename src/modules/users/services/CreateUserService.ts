import { hash } from "bcryptjs";

import prisma from "../../../prisma";

interface IUserRequest {
  name: string,
  username: string,
  password: string
};

export default class CreateUserService {
  async execute({ name, username, password }: IUserRequest) {
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        username
      }
    });

    if (userAlreadyExists) throw new Error("User already exists!");

    const passwordHash = await hash(password, 8)

    const user = prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash
      }
    });

    return user;
  };
};
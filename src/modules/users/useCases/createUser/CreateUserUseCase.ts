import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppErrors";

export class CreateUserUseCase {
  async execute({ name, email }: CreateUserDTO): Promise<User> {
    //Conferir se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      //Erro caso já exista um usuário com o email informado
      throw new AppError("Usuário já existe!");
    }

    //Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return user;
  }
}

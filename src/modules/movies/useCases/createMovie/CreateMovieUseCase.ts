import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateMovieDTO } from "../../dtos/CreateMovieDTO";
import { AppError } from "../../../../errors/AppErrors";

export class CreateMovieUseCase {
  async execute({ title, duration, release_date }: CreateMovieDTO): Promise<Movie> {
    //Conferir se o filme já existe
    const movieAlreadyExists = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    if (movieAlreadyExists) {
      //Erro caso já exista um usuário com o email informado
      throw new AppError("Esse filme já existe!");
    }

    //Criar filme
    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        release_date
      },
    });

    return movie;
  }
}

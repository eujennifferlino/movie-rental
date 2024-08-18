import { AppError } from "../../../../errors/AppErrors";
import { prisma } from "../../../../prisma/client";
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
 async execute({ movieId, userId}: CreateMovieRentDTO): Promise<void> {
    // Verificar se o filme existe
    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    });

    if (!movieExists) {
      throw new AppError("Esse filme não existe!");
    }

    // Verificar se o filme já foi alugado por outra pessoa
    const movieAlreadyRented = await prisma.movieRent.findFirst({
      where: {
        movieId,
      }
    });

    if (movieAlreadyRented) {
      throw new AppError("Lamento, mas esse filme já está alugado!");
    }

    // Verificar se o usuário existe
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userExists) {
      throw new AppError("Esse usuário não existe!");
    }

    // Criar aluguel do filme
   await prisma.movieRent.create({
      data: {
        movieId,
        userId
      }
    });
 }
}
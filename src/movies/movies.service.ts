import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-moive.dto';
import { UpdateMovieDTO } from './dto/update-moive.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number):Movie{
    const movie = this.movies.find(movie=> movie.id === id);
    if(!movie){
      throw new NotFoundException(`Movie with ID ${id} not found`)
    }
    return movie;
  }

  deleteOne(id:number) {
    this.getOne(id)
    this.movies = this.movies.filter(movie => movie.id !== id);
  }

  createMovie(data: CreateMovieDTO){
    this.movies.push({
      id: this.movies.length + 1,
      ...data
    })
    return data;
  }

  update(id:number, updateData: UpdateMovieDTO){
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({...movie, ...updateData})
  }
}

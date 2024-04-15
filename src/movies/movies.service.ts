import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string):Movie{
    return this.movies.find(movie=> movie.id === parseInt(id));
  }

  deleteOne(id:string):boolean {
    this.movies.filter(movie => movie.id !== parseInt(id));
    return true;
  }

  createMovie(data){
    this.movies.push({
      id: this.movies.length + 1,
      ...data
    })
    return ["success to create a object", data];
  }
}

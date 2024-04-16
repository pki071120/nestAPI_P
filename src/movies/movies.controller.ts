import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-moive.dto';

@Controller('movies')
export class MoviesController {

  constructor(readonly movieService: MoviesService) {}

  @Get()
  getAll() :Movie[]{
    return this.movieService.getAll();
  }

  @Get(`:id`)
  getOne(@Param('id') id: number): Movie {
    return this.movieService.getOne(id);
  }

  @Post()
  create(@Body() Data: CreateMovieDTO) {
    return this.movieService.createMovie(Data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.movieService.deleteOne(id);
  }
  
  @Patch(':id')
  patch(@Param('id') id: number, @Body() Data) {
    return this.movieService.update(id, Data);
  }
}

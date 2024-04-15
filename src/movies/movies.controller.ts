import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {

  constructor(readonly movieService: MoviesService) {}

  @Get()
  getAll() :Movie[]{
    return this.movieService.getAll();
  }

  @Get(`/:id`)
  getOne(@Param('id') id: string): Movie {
    return this.movieService.getOne(id);
  }

  @Post()
  create(@Body() Data) {
    return this.movieService.createMovie(Data);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.movieService.deleteOne(id);
  }
  
  @Patch('/:id')
  patch(@Param('id') id: string, @Body() Data) {
    return {
      dataId : id,
      ...Data,
    }
  }
}

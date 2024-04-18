import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('shoule return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a moive', () => {
      service.createMovie({
        title: 'test',
        geners: ['test'],
        year: 2020,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it('shlould throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.createMovie({
        title: 'test',
        geners: ['test'],
        year: 2020,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'test',
        geners: ['test'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'test',
        geners: ['test'],
        year: 2020,
      });
      service.update(1, { title: 'update' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update');
    });

    it('should throw a NotFoundExeception', () => {
      try {
        service.update(999, { title: 'update' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});

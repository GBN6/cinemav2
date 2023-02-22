import { TestBed } from '@angular/core/testing';
import { MoviesListService } from './movies-list.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

describe('MovieListService', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MoviesListService],
      imports: [HttpClientTestingModule],
    });
  });

  it('get movie list', (done) => {
    //arrange
    const expectedUrl = 'http://localhost:3000/dates/0/films';
    const service = TestBed.inject(EnvironmentInjector).get(MoviesListService);
    const httpController = TestBed.inject(HttpTestingController);

    //act
    service.getMovies(0).subscribe({
      next: (res) => {
        expect(res).toEqual([]);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush([]);
  });
});

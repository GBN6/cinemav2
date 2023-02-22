import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SelectedMovieStatfullService } from './selected-movie.state.service';

const MoviesCard = {
  id: 0,
  movieId: 0,
  img: 'img',
  title: 'title',
  genre: 'genre',
  length: 'length',
  ageRest: 'agerest',
  description: 'description',
  longDescription: 'longDescription',
  score: 'score',
  premier: false,
};

const Show = {
  id: 0,
  hour: 'hour',
  screen: 'screen',
  reservedSeats: ['1', '2'],
  priceList: [{ type: 'type,', price: 21 }],
  movieId: 1,
};

describe('TicketState', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SelectedMovieStatfullService],
    });
  });

  it('initial state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(
      SelectedMovieStatfullService
    );

    state.movieState$.subscribe((result) => {
      expect(result).toEqual({});
      done();
    });
  });

  it('add movie and show', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(
      SelectedMovieStatfullService
    );
    const movieAndShow = state.addNewSelectedState(MoviesCard, Show);
  });
});

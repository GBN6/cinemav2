import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SelectedMovieStatfullService } from './selected-movie.state.service';

const movies = {
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

const show = {
  id: 0,
  hour: 'hour',
  screen: 'screen',
  reservedSeats: ['1', '2'],
  priceList: [{ type: 'type,', price: 21 }],
  movieId: 1,
};

const date = {
  id: 1,
  date: '12.01.2023',
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

  it('add selected date to state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(
      SelectedMovieStatfullService
    );

    state.addNewSelectedDate(date);

    state.movieState$.subscribe((result) => {
      expect(result.selectedDate).toEqual(date);
      expect(result.selectedDate.id).toBe(1);
      done();
    });
  });

  it('add movie and show', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(
      SelectedMovieStatfullService
    );

    state.addNewSelectedState(movies, show);

    state.movieState$.subscribe((state) => {
      expect(state.selectedMovie).toEqual(movies);
      expect(state.selectedShow).toEqual(show);
      done();
    });
  });

  it('clear movie state', (done) => {
    const state = TestBed.inject(EnvironmentInjector).get(
      SelectedMovieStatfullService
    );

    state.addNewSelectedState(movies, show);
    state.addNewSelectedDate(date);

    state.clearMovieAndShowState();

    state.movieState$.subscribe((result) => {
      expect(result).toEqual({});
      expect(result.selectedDate).toEqual(undefined);
      done();
    });
  });
});

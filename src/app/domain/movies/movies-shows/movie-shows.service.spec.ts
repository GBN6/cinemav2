import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MovieShowsService } from './movies-shows.service';
import { EnvironmentInjector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

describe('MovieShowsService', () => {
  const mockResponse = [
    {
      id: 0,
      hour: '16:30',
      screen: 'A',
      reservedSeats: ['A3', 'E2', 'E1', 'C5', 'B7', 'A4', 'E8'],
      priceList: [
        {
          type: 'Normalny',
          price: 30,
        },
        {
          type: 'Ulgowy',
          price: 15,
        },
        {
          type: 'Voucher',
          price: 20,
        },
      ],
      movieId: 0,
      dateId: 0,
    },
    {
      id: 1,
      hour: '12:30',
      screen: 'A',
      reservedSeats: [],
      priceList: [
        {
          type: 'Normalny',
          price: 30,
        },
        {
          type: 'Ulgowy',
          price: 15,
        },
        {
          type: 'Voucher',
          price: 20,
        },
      ],
      movieId: 0,
      dateId: 0,
    },
  ];

  const mockSorted = [
    {
      id: 1,
      hour: '12:30',
      screen: 'A',
      reservedSeats: [],
      priceList: [
        {
          type: 'Normalny',
          price: 30,
        },
        {
          type: 'Ulgowy',
          price: 15,
        },
        {
          type: 'Voucher',
          price: 20,
        },
      ],
      movieId: 0,
      dateId: 0,
    },
    {
      id: 0,
      hour: '16:30',
      screen: 'A',
      reservedSeats: ['A3', 'E2', 'E1', 'C5', 'B7', 'A4', 'E8'],
      priceList: [
        {
          type: 'Normalny',
          price: 30,
        },
        {
          type: 'Ulgowy',
          price: 15,
        },
        {
          type: 'Voucher',
          price: 20,
        },
      ],
      movieId: 0,
      dateId: 0,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MovieShowsService],
      imports: [HttpClientTestingModule],
    });
  });

  it('get shows sorted', (done) => {
    const expectedUrl = 'http://localhost:3000/show?movieId=0&dateId=0';
    const service = TestBed.inject(EnvironmentInjector).get(MovieShowsService);
    const httpController = TestBed.inject(HttpTestingController);

    service.getShows(0, 0).subscribe({
      next: (result) => {
        expect(result).toEqual(mockSorted);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush(mockResponse);
  });
});

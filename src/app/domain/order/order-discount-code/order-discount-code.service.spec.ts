import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EnvironmentInjector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DiscountCodeService } from './order-discunt-code.service';

describe('OrderDiscountCodeService', () => {
  const mockCoupon = [
    {
      id: 2,
      code: 'fakeKino',
      discount: 10,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DiscountCodeService],
      imports: [HttpClientTestingModule],
    });
  });

  it('is code valid', (done) => {
    const expectedUrl = 'http://localhost:3000/coupons?code=fakeKino';
    const service =
      TestBed.inject(EnvironmentInjector).get(DiscountCodeService);
    const httpController = TestBed.inject(HttpTestingController);

    service.checkIfDiscountCodeExist('fakeKino').subscribe({
      next: (result) => {
        expect(result).toEqual(true);
        done();
      },
      error: (err: HttpErrorResponse) => {
        expect(err.statusText).toEqual('Error');
        done();
      },
    });

    const req = httpController.expectOne(expectedUrl);

    req.flush(mockCoupon);
  });
});

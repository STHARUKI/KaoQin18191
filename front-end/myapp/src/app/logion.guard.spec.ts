import { TestBed, async, inject } from '@angular/core/testing';

import { LogionGuard } from './logion.guard';

describe('LogionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogionGuard]
    });
  });

  it('should ...', inject([LogionGuard], (guard: LogionGuard) => {
    expect(guard).toBeTruthy();
  }));
});

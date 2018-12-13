import { TestBed } from '@angular/core/testing';

import { DataIntService } from './data-int.service';

describe('DataIntService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataIntService = TestBed.get(DataIntService);
    expect(service).toBeTruthy();
  });
});

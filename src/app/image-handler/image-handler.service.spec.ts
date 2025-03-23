import { TestBed } from '@angular/core/testing';

import { ImageHandlerService } from './image-handler.service';

describe('ImageHandlerService', () => {
  let service: ImageHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

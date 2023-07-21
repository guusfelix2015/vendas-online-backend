import { Test, TestingModule } from '@nestjs/testing';
import { BlauService } from './blau.service';

describe('BlauService', () => {
  let service: BlauService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlauService],
    }).compile();

    service = module.get<BlauService>(BlauService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

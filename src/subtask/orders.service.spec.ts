import { Test, TestingModule } from '@nestjs/testing';
import { SubtaskService } from './orders.service';

describe('SubtaskService', () => {
  let service: SubtaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtaskService],
    }).compile();

    service = module.get<SubtaskService>(SubtaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

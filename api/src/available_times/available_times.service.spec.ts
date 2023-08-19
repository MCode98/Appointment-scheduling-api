import { Test, TestingModule } from '@nestjs/testing';
import { AvailableTimesService } from './available_times.service';

describe('AvailableTimesService', () => {
  let service: AvailableTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvailableTimesService],
    }).compile();

    service = module.get<AvailableTimesService>(AvailableTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

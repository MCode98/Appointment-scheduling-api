import { Test, TestingModule } from '@nestjs/testing';
import { AvailableTimesController } from './available_times.controller';
import { AvailableTimesService } from './available_times.service';

describe('AvailableTimesController', () => {
  let controller: AvailableTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailableTimesController],
      providers: [AvailableTimesService],
    }).compile();

    controller = module.get<AvailableTimesController>(AvailableTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

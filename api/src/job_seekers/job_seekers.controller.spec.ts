import { Test, TestingModule } from '@nestjs/testing';
import { JobSeekersController } from './job_seekers.controller';
import { JobSeekersService } from './job_seekers.service';

describe('JobSeekersController', () => {
  let controller: JobSeekersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSeekersController],
      providers: [JobSeekersService],
    }).compile();

    controller = module.get<JobSeekersController>(JobSeekersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

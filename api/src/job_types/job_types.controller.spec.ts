import { Test, TestingModule } from '@nestjs/testing';
import { JobTypesController } from './job_types.controller';
import { JobTypesService } from './job_types.service';

describe('JobTypesController', () => {
  let controller: JobTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobTypesController],
      providers: [JobTypesService],
    }).compile();

    controller = module.get<JobTypesController>(JobTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

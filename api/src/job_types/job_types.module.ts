import { Module } from '@nestjs/common';
import { JobTypesService } from './job_types.service';
import { JobTypesController } from './job_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobType } from './entities/job_type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobType])
  ],
  controllers: [JobTypesController],
  providers: [JobTypesService],
})
export class JobTypesModule {}

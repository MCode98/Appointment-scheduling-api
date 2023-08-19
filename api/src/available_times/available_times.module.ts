import { Module } from '@nestjs/common';
import { AvailableTimesService } from './available_times.service';
import { AvailableTimesController } from './available_times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailableTime } from './entities/available_time.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AvailableTime])
  ],
  controllers: [AvailableTimesController],
  providers: [AvailableTimesService],
})
export class AvailableTimesModule {}

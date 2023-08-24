import { Module } from '@nestjs/common';
import { JobSeekersService } from './job_seekers.service';
import { JobSeekersController } from './job_seekers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job_seeker.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobSeeker, Appointment])
  ],
  controllers: [JobSeekersController],
  providers: [JobSeekersService],
})
export class JobSeekersModule {}

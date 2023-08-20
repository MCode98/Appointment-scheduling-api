import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailableTime } from 'src/available_times/entities/available_time.entity';
import { Appointment } from './entities/appointment.entity';
import { JobSeeker } from 'src/job_seekers/entities/job_seeker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AvailableTime, Appointment, JobSeeker])
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}

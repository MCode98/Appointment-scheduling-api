import { Module } from '@nestjs/common';
import { AvailableTimesService } from './available_times.service';
import { AvailableTimesController } from './available_times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailableTime } from './entities/available_time.entity';
import { Consultant } from 'src/consultants/entities/consultant.entity';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { JobSeeker } from 'src/job_seekers/entities/job_seeker.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AvailableTime, Consultant, Appointment, JobSeeker])
  ],
  controllers: [AvailableTimesController],
  providers: [
    AvailableTimesService,
    AppointmentsService
  ],
})
export class AvailableTimesModule {}

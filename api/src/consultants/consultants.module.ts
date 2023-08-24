import { Module } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { ConsultantsController } from './consultants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultant } from './entities/consultant.entity';
import { AvailableTime } from 'src/available_times/entities/available_time.entity';
import { AvailableTimesService } from 'src/available_times/available_times.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { JobSeeker } from 'src/job_seekers/entities/job_seeker.entity';
import { AppointmentsService } from 'src/appointments/appointments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Consultant, AvailableTime, Appointment, JobSeeker])
  ],
  controllers: [ConsultantsController],
  providers: [
    ConsultantsService,
    AvailableTimesService,
    AppointmentsService
  ],
})
export class ConsultantsModule {}

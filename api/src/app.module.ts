import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from './admins/admins.module';
import { JobTypesModule } from './job_types/job_types.module';
import { ConsultantsModule } from './consultants/consultants.module';
import { JobSeekersModule } from './job_seekers/job_seekers.module';
import { Admin } from './admins/entities/admin.entity';
import { Consultant } from './consultants/entities/consultant.entity';
import { JobSeeker } from './job_seekers/entities/job_seeker.entity';
import { JobType } from './job_types/entities/job_type.entity';
import { AvailableTimesModule } from './available_times/available_times.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AvailableTime } from './available_times/entities/available_time.entity';
import { Appointment } from './appointments/entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      logging: true,
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'Appointment_scheduling',
      synchronize: true,
      entities: [Admin,Consultant,JobSeeker,JobType,AvailableTime,Appointment],
    }),
    AdminsModule,
    JobTypesModule,
    ConsultantsModule,
    JobSeekersModule,
    AvailableTimesModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

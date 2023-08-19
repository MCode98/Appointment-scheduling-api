import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from './admins/admins.module';
import { ConsultantsModule } from './consultants/consultants.module';
import { JobSeekersModule } from './job_seekers/job_seekers.module';
import { Admin } from './admins/entities/admin.entity';
import { Consultant } from './consultants/entities/consultant.entity';
import { JobSeeker } from './job_seekers/entities/job_seeker.entity';
import { AvailableTimesModule } from './available_times/available_times.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AvailableTime } from './available_times/entities/available_time.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { ConfigModule } from '@nestjs/config';
import { IamModule } from './iam/iam.module';
import { TokenId } from './iam/authentication/refresh-token-ids.storage/token_id.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      logging: true,
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.DB_SYNCHRONIZE && process.env.DB_SYNCHRONIZE === 'sync'
      ? true
      : false,
      entities: [Admin,Consultant,JobSeeker,AvailableTime,Appointment, TokenId],
    }),
    AdminsModule,
    ConsultantsModule,
    JobSeekersModule,
    AvailableTimesModule,
    AppointmentsModule,
    IamModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

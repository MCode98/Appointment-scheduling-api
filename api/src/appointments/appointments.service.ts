import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailableTime } from 'src/available_times/entities/available_time.entity';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { JobSeeker } from 'src/job_seekers/entities/job_seeker.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AvailableTime)
    private timeRepo: Repository<AvailableTime>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    @InjectRepository(JobSeeker)
    private jobSeekerRepo: Repository<JobSeeker>,
  ) { }

  async create(req: any, createAppointmentDto: CreateAppointmentDto) {
    try{
      if(req.user.role != 'job_seeker') throw new UnauthorizedException('user not a job seeker.!');
      
      const job_seeker = await this.jobSeekerRepo.findOneBy({id: req.user.sub});
      if (!job_seeker) throw new NotFoundException('Job Seeker Not Found');

      const time = await this.timeRepo.findOne({
        where: {
          id: createAppointmentDto.available_time_id,
          available: true
        }
      });
      if (!time) throw new NotFoundException('Invalid Available Time');

      const appointment = new Appointment();
      appointment.availableTime = time;
      appointment.job_seeker = job_seeker;
      appointment.status = 'active';
      await this.appointmentRepo.save(appointment);

      time.available = false;
      await this.timeRepo.save(time);
      return ('appoinment created successfully!');

    }catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}

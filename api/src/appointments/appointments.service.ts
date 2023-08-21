import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AvailableTime } from 'src/available_times/entities/available_time.entity';
import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { JobSeeker } from 'src/job_seekers/entities/job_seeker.entity';
import { format } from 'date-fns';

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

  async findAll(req: any) {
    try{
      let appointments: any;
      if (req.user.role == 'admin'){
        appointments = await this.appointmentRepo.find({
          order: { id: 'DESC' },
          relations: {
            availableTime: {
              consultant: true
            },
            job_seeker: true
          }
        });
      }
      else if(req.user.role == 'consultant'){
        appointments = await this.appointmentRepo.find({
          order: { id: 'DESC' },
          relations: {
            availableTime: {
              consultant: true
            },
            job_seeker: true
          },
          where: {
            availableTime: {
              consultant: {
                id: req.user.sub
              }
            }
          }
        });
      }
      else if (req.user.role == 'job_seeker'){
        appointments = await this.appointmentRepo.find({
          order: { id: 'DESC' },
          relations: {
            availableTime: {
              consultant: true
            },
            job_seeker: true
          },
          where: {
            job_seeker: {
              id: req.user.sub
            }
          }
        });
      }
      let appointmentList = [];
      for (const appoinment of appointments) {
        const dateTime = await this.setDateTime(
          appoinment.availableTime.start_time,
          appoinment.availableTime.end_time
        );
        let element = {
          id: appoinment.id,
          consultantName: appoinment.availableTime.consultant.name,
          jobSeekerName: appoinment.job_seeker.name,
          dateTime: dateTime,
          jobType: appoinment.availableTime.consultant.job_type,
          status: appoinment.status
        }
        appointmentList.push(element);
      }
      return appointmentList;

    }catch (err){
      throw err;
    }
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

  async setDateTime(startTime: Date, endTime: Date){
    try
    {
      const start = format(startTime, "MMM dd yyyy HH:mm:ss");
      const end = format(endTime, "HH:mm:ss");
      return (start+' - '+end);
    }
    catch(err)
    {
      throw err;
    }

  }
}

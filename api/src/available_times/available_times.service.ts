import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAvailableTimeDto } from './dto/create-available_time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailableTime } from './entities/available_time.entity';
import { Consultant } from 'src/consultants/entities/consultant.entity';
import { format } from 'date-fns';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Injectable()
export class AvailableTimesService {
  constructor(
    @InjectRepository(AvailableTime)
    private timeRepo: Repository<AvailableTime>,
    @InjectRepository(Consultant)
    private consultantRepo: Repository<Consultant>,
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
    private readonly appointmentService: AppointmentsService
  ) { }

  async create(req: any, createAvailableTimeDto: CreateAvailableTimeDto) {
    try
    {
      if(req.user.role != 'consultant') throw new UnauthorizedException('user not a consultant.!');
      const consultant = await this.consultantRepo.findOneBy({id: req.user.sub});
      const time = new AvailableTime();
      time.available = true;
      time.start_time = createAvailableTimeDto.start_time;
      time.end_time = createAvailableTimeDto.end_time;
      time.consultant = consultant;
      await this.timeRepo.save(time);
      return ('success');
    }
    catch(err)
    {
      throw err;
    }
  }

  async findAll(req: any) {
    try
    {
      if (req.user.role != 'admin') throw new BadRequestException('This user not an andmin!');
      
      const available_times = await this.timeRepo.find({
        order: { id: 'DESC' },
        relations: {consultant: true}
      });

      let timeList = [];
      for (const time of available_times) {
        let dateTime = await this.setDateTime(
          time.start_time,
          time.end_time
        );
        const element = {
          id: time.id,
          dateTime: dateTime,
          available: time.available,
          consultant: time.consultant
        }
        timeList.push(element);
      }
      return timeList;
    }
    catch(err)
    {
      throw err;
    }
  }

  async findByConsultant(req: any, consultant_id: number){
    try
    {      
      const available_times = await this.timeRepo.find({
        order: { id: 'DESC' },
        relations: {consultant: true},
        where: {
          consultant: {
            id: consultant_id
          },
          available: true
        }
      });

      let timeList = [];
      for (const time of available_times) {
        let dateTime = await this.setDateTime(
          time.start_time,
          time.end_time
        );
        const element = {
          id: time.id,
          dateTime: dateTime,
          available: time.available
        }
        timeList.push(element);
      }
      return timeList;
    }
    catch(err)
    {
      throw err;
    }
  }

  async remove(id: number, req: any) {
    try
    {
      const time = await this.timeRepo.findOne({
        where: {
          id: id
        },
        relations: {consultant: true}
      });
      if (!time) throw new NotFoundException('Time not found');

      const appoinment = await this.appointmentRepo.findOneBy({
        availableTime: {
          id: time.id
        }
      });
      if(time.consultant.id == req.user.sub && req.user.role == 'consultant'){
        if(appoinment){
          await this.appointmentService.remove(appoinment.id, req);
        }
        await this.timeRepo.remove(time);
        return ('Successfully deleted');
      }
      else if (req.user.role == 'admin')
      {
        if(appoinment){
          await this.appointmentService.remove(appoinment.id, req);
        }
        await this.timeRepo.remove(time);
        return ('Successfully deleted');
      }
      else
      {
        throw new ForbiddenException('Access Denied!');
      }
    }
    catch(err)
    {
      throw err;
    }
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

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAvailableTimeDto } from './dto/create-available_time.dto';
import { UpdateAvailableTimeDto } from './dto/update-available_time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailableTime } from './entities/available_time.entity';
import { Consultant } from 'src/consultants/entities/consultant.entity';

@Injectable()
export class AvailableTimesService {
  constructor(
    @InjectRepository(AvailableTime)
    private timeRepo: Repository<AvailableTime>,
    @InjectRepository(Consultant)
    private consultantRepo: Repository<Consultant>
  ) { }

  async create(req: any, createAvailableTimeDto: CreateAvailableTimeDto) {
    try{
      if(req.user.role != 'consultant') throw new UnauthorizedException('user not a consultant.!');
      const consultant = await this.consultantRepo.findOneBy({id: req.user.sub});
      const time = new AvailableTime();
      time.available = true;
      time.start_time = createAvailableTimeDto.start_time;
      time.end_time = createAvailableTimeDto.end_time;
      time.consultant = consultant;
      await this.timeRepo.save(time);
      return ('success');

    }catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all availableTimes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availableTime`;
  }

  update(id: number, updateAvailableTimeDto: UpdateAvailableTimeDto) {
    return `This action updates a #${id} availableTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} availableTime`;
  }
}

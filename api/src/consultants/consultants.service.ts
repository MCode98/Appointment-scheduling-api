import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultant } from './entities/consultant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsultantsService {
  constructor(
    @InjectRepository(Consultant)
    private consultantRepo: Repository<Consultant>
  ) { }

  async findAll(req: any, job_type: string, country: string) {
    try
    {
      const consultants = await this.consultantRepo.find({
        order: { id: 'DESC'},
        where: {
          job_type: job_type,
          country: country
        },
        select: {
          id: true,
          name: true,
          email: true,
          country: true,
          job_type: true,
          mobile: true,
          address: true,
          description: true
        }
      });
      return consultants;
    }
    catch(err)
    {
      throw err;
    }
  }

  async findOne(req: any, id: number) {
    try
    {
      const consultant = await this.consultantRepo.findOne({
        where: { id: id},
        select: {
          id: true,
          name: true,
          email: true,
          country: true,
          job_type: true,
          mobile: true,
          address: true,
          description: true
        }
      });
      if (!consultant) throw new NotFoundException('Consultant Not Found!');
      return consultant;
    }
    catch(err)
    {
      throw err;
    }
  }

  async update(id: number, attrs: Partial<Consultant>, req: any) {
    try
    {
      if (Object.keys(attrs).length === 0) {
        throw new BadRequestException("PAYLOAD_EMPTY");
      }
      const consultant = await this.findOne(req, id);
      if (consultant.id != req.user.sub) {
        throw new ForbiddenException("Access Denied");
      }

      Object.assign(consultant, attrs);
      await this.consultantRepo.save(consultant);
      return consultant;
    }
    catch(err)
    {
      throw err;
    }
  }

  async remove(req: any, id: number) {
    try
    {
      if (req.user.role != 'admin') throw new ForbiddenException('Access Denied');
      const consultant = await this.consultantRepo.findOneBy({id: id});
      await this.consultantRepo.remove(consultant);
      return ('successfully deleted.!');
    }
    catch(err)
    {
      throw err;
    }
  }
}

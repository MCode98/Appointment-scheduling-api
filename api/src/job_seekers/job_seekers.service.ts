import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateJobSeekerDto } from './dto/update-job_seeker.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobSeeker } from './entities/job_seeker.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private jobSeekerRepo: Repository<JobSeeker>
  ) { }

  async findAll(req: any) {
    try
    {
      if (req.user.role != 'admin') throw new ForbiddenException('Access denied!');
      const job_seekers = await this.jobSeekerRepo.find({
        order: { id: 'DESC'},
        select: {
          id: true,
          name: true,
          age: true,
          email: true,
          mobile: true
        }
      });
      return job_seekers;
    }
    catch(err)
    {
      throw err;
    }
  }

  async findOne(id: number, req: any) {
    try
    {
      if( (req.user.role == 'job_seeker' && req.user.sub == id) || req.user.role == 'admin'){
        const job_seeker = await this.jobSeekerRepo.findOne({
          where: { id: id},
          select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
            age: true
          }
        });
        if (!job_seeker) throw new NotFoundException('Job Seeker Not Found!');
        return job_seeker;
      }
      else
      {
        throw new BadRequestException('Invalid Request!');
      }
    }
    catch(err)
    {
      throw err;
    }
  }

  async update(id: number, attrs: Partial<JobSeeker>, req: any) {
    try
    {
      if (Object.keys(attrs).length === 0) {
        throw new BadRequestException("PAYLOAD_EMPTY");
      }
      const job_seeker = await this.findOne(id, req);
      if (job_seeker.id != req.user.sub) {
        throw new ForbiddenException("Access Denied");
      }
      
      Object.assign(job_seeker, attrs);
      await this.jobSeekerRepo.save(job_seeker);
      return job_seeker;
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
      const job_seeker = await this.jobSeekerRepo.findOneBy({id: id});
      await this.jobSeekerRepo.remove(job_seeker);
      return ('successfully deleted.!');
    }
    catch(err)
    {
      throw err;
    }
  }
}

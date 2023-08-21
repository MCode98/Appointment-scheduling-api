import { ForbiddenException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} jobSeeker`;
  }

  update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    return `This action updates a #${id} jobSeeker`;
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

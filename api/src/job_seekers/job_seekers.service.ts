import { Injectable } from '@nestjs/common';
import { CreateJobSeekerDto } from './dto/create-job_seeker.dto';
import { UpdateJobSeekerDto } from './dto/update-job_seeker.dto';

@Injectable()
export class JobSeekersService {
  create(createJobSeekerDto: CreateJobSeekerDto) {
    return 'This action adds a new jobSeeker';
  }

  findAll() {
    return `This action returns all jobSeekers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobSeeker`;
  }

  update(id: number, updateJobSeekerDto: UpdateJobSeekerDto) {
    return `This action updates a #${id} jobSeeker`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobSeeker`;
  }
}

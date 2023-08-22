import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { JobSeekersService } from './job_seekers.service';
import { UpdateJobSeekerDto } from './dto/update-job_seeker.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enums';

@Auth(AuthType.Bearer)
@Controller('job-seekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersService) {}

  @Get()
  findAll(
    @Request() req: any
  ) {
    return this.jobSeekersService.findAll(req);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: any
    ) {
    return this.jobSeekersService.findOne(+id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobSeekerDto: UpdateJobSeekerDto,
    @Request() req: any
    ) {
    return this.jobSeekersService.update(+id, updateJobSeekerDto, req);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: any
    ) {
    return this.jobSeekersService.remove(req, +id);
  }
}

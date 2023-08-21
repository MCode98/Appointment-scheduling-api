import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { ConsultantsService } from './consultants.service';
import { UpdateConsultantDto } from './dto/update-consultant.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enums';

@Auth(AuthType.Bearer)
@Controller('consultants')
export class ConsultantsController {
  constructor(private readonly consultantsService: ConsultantsService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('job_type') job_type: string,
    @Query('country') country: string,
  ) {
    return this.consultantsService.findAll(req, job_type, country);
  }

  @Get(':id')
  findOne(
    @Request() req: any,
    @Param('id') id: string
    ) {
    return this.consultantsService.findOne(req,+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultantDto: UpdateConsultantDto) {
    return this.consultantsService.update(+id, updateConsultantDto);
  }

  @Delete(':id')
  remove(
    @Request() req: any,
    @Param('id') id: string
    ) {
    return this.consultantsService.remove(req, +id);
  }
}

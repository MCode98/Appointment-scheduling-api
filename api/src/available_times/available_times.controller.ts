import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { AvailableTimesService } from './available_times.service';
import { CreateAvailableTimeDto } from './dto/create-available_time.dto';
import { UpdateAvailableTimeDto } from './dto/update-available_time.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enums';

@Auth(AuthType.Bearer)
@Controller('available-times')
export class AvailableTimesController {
  constructor(private readonly availableTimesService: AvailableTimesService) {}

  @Post('create')
  create(
    @Request() req: any,
    @Body() createAvailableTimeDto: CreateAvailableTimeDto
    ) {
    return this.availableTimesService.create(req, createAvailableTimeDto);
  }

  @Get('list')
  findAll(
    @Request() req: any,
  ) {
    return this.availableTimesService.findAll(req);
  }

  @Get('list/:id')
  findByConsultant(
    @Request() req: any,
    @Param('id') consultant_id: string
    ) {
    return this.availableTimesService.findByConsultant(req, +consultant_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availableTimesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAvailableTimeDto: UpdateAvailableTimeDto) {
    return this.availableTimesService.update(+id, updateAvailableTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availableTimesService.remove(+id);
  }
}

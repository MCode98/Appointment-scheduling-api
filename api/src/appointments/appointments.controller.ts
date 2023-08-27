import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enums';

@Auth(AuthType.Bearer)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post('create')
  createAppointment(
    @Request() req: any,
    @Body() createAppointmentDto: CreateAppointmentDto
    ) {
    return this.appointmentsService.create(req, createAppointmentDto);
  }

  @Get('all')
  findAll(
    @Request() req: any,
  ) {
    return this.appointmentsService.findAll(req);
  }

  @Patch(':id/status-change')
  statusChange(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Request() req: any,
    ) {
    return this.appointmentsService.statusChange(+id, updateAppointmentDto, req);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req: any,
    ) {
    return this.appointmentsService.remove(+id, req);
  }
}

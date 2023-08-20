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

  @Get()
  findAll() {
    return this.availableTimesService.findAll();
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

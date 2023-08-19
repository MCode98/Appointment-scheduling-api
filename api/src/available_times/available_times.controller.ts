import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvailableTimesService } from './available_times.service';
import { CreateAvailableTimeDto } from './dto/create-available_time.dto';
import { UpdateAvailableTimeDto } from './dto/update-available_time.dto';

@Controller('available-times')
export class AvailableTimesController {
  constructor(private readonly availableTimesService: AvailableTimesService) {}

  @Post()
  create(@Body() createAvailableTimeDto: CreateAvailableTimeDto) {
    return this.availableTimesService.create(createAvailableTimeDto);
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

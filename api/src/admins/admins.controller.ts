import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: any
    ) {
    return this.adminsService.findOne(+id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
    @Request() req: any
    ) {
    return this.adminsService.update(+id, updateAdminDto, req);
  }
}

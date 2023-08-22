import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>
  ) { }

  findAll() {
    return `This action returns all admins`;
  }

  async findOne(id: number, req: any) {
    try
    {
      if (req.user.role != 'admin') throw new ForbiddenException('Access Denied!');
      const admin = await this.adminRepo.findOne({
        where: { id: id},
        select: {
          id: true,
          user_name: true,
          email: true,
          mobile: true
        }
      });
      if (!admin) throw new NotFoundException('Admin Not Found!');
      return admin;
    }
    catch(err)
    {
      throw err;
    }
  }

  async update(id: number, attrs: Partial<Admin>, req: any) {
    try
    {
      if (Object.keys(attrs).length === 0) {
        throw new BadRequestException("PAYLOAD_EMPTY");
      }
      const admin = await this.findOne(id, req);
      if (admin.id != req.user.sub) {
        throw new ForbiddenException("Access Denied");
      }

      Object.assign(admin, attrs);
      await this.adminRepo.save(admin);
      return admin;
    }
    catch(err)
    {
      throw err;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}

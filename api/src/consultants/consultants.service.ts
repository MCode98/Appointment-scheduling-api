import { Injectable } from '@nestjs/common';
import { UpdateConsultantDto } from './dto/update-consultant.dto';

@Injectable()
export class ConsultantsService {

  findAll() {
    return `This action returns all consultants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultant`;
  }

  update(id: number, updateConsultantDto: UpdateConsultantDto) {
    return `This action updates a #${id} consultant`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultant`;
  }
}

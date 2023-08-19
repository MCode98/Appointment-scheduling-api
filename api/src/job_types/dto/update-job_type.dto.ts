import { PartialType } from '@nestjs/mapped-types';
import { CreateJobTypeDto } from './create-job_type.dto';

export class UpdateJobTypeDto extends PartialType(CreateJobTypeDto) {}

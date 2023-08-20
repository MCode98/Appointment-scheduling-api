import { IsNumber, IsNotEmpty } from "class-validator";
export class CreateAppointmentDto {

    @IsNumber()
    @IsNotEmpty()
    available_time_id: number;
}

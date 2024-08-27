import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export class ReportDto {
    @Expose()
    id: number;

    @Expose()
    name: string;
    
    @Expose()
    quantity: number;

    @Expose()
    price: number;

    @Transform(({ value }) => parseInt(value))
    @Expose()
    totalPrice: number;
    
    @Expose()
    date: Date;
    
    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number;

    @Transform(({ obj }) => obj.user.email)
    @Expose()
    userEmail: string;

}
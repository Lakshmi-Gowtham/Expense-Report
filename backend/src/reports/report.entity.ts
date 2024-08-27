import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne 
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;

  @Column()
  name: string;
  
  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}

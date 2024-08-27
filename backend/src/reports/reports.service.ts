import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repo: Repository<Report>,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    await this.repo.save(report);

    user.totalExpense +=report.totalPrice;
    await this.userRepo.save(user);
    return report;
  }

  async getReportOfUser(userId: number): Promise<Report[]> {
    return await this.repo.find({
      where: { user: { id: userId } },
      relations: ['user'],  // Ensure the user relation is loaded
    });
  }

  async getTotalExpense(reportDto: ReportDto) {
    return this.repo.createQueryBuilder()
    .select('*')
    .getRawMany()
  }

  async getReportsByDate(date: Date, userId: number): Promise<Report[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    return await this.repo.find({
      where: { 
        date: Between(startOfDay, endOfDay), 
        user: { id: userId } 
      },
      relations: ['user'],  // Ensure the user relation is loaded
    });
  }
}

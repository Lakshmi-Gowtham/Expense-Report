import { Controller, Post, Body, UseGuards, Param, Get} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('reports')
@UseGuards(AuthGuard)
@Serialize(ReportDto)
// @Serialize(UserDto)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    console.log(user.id);
    return this.reportsService.create(body, user);
  }

  @Get('/expenses')
  getReportOfUser(@CurrentUser() user: User){
    return this.reportsService.getReportOfUser(user.id);
  }

  @Get('/total-expense')
  async getTotalExpense(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:date')
  getReportsByDate(@Param('date') date: string, @CurrentUser() user: User) {
    const [year, month, day] = date.split('-').map(num => parseInt(num, 10));
    const parsedDate = new Date(year, month - 1, day);
    console.log(parsedDate);
    return this.reportsService.getReportsByDate(parsedDate, user.id);
  }
}

import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCalendarDto } from 'src/calendar/dto/create-calendar.dto';
import { CalendarService } from 'src/calendar/calendar.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly calendarService: CalendarService,
  ) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post(':userId/calendar/holidays')
  async addHolidaysToCalendar(
    @Param('userId') userId: string,
    @Body() createCalendarDto: CreateCalendarDto,
  ) {
    await this.calendarService.addHolidaysToCalendar(userId, createCalendarDto);
    return { message: 'Holidays added to calendar successfully' };
  }
}

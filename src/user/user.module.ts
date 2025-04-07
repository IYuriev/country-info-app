import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CalendarService } from 'src/calendar/calendar.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CalendarService],
})
export class UserModule {}

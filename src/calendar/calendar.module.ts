import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  exports: [CalendarService],
  providers: [CalendarService, PrismaService],
})
export class CalendarModule {}

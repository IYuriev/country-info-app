import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [CountryModule, UserModule, PrismaModule, CalendarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

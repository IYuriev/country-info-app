import { CreateCalendarDto } from './dto/create-calendar.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Holiday } from 'src/interfaces/calendar';
import { ENDPOINTS } from 'src/constants/endpoints/calendar';
import 'dotenv/config';

@Injectable()
export class CalendarService {
  constructor(private readonly prisma: PrismaService) {}

  private async getHolidays(
    countryCode: string,
    year: number,
  ): Promise<Holiday[]> {
    const response = await fetch(
      `${process.env.COUNTRY_GENERAL_INFO_API_URL}${ENDPOINTS.PUBIC_HOLIDAYS}/${year}/${countryCode}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching holidays: ${response.statusText}`);
    }
    const data = (await response.json()) as Holiday[];
    return data;
  }

  private async saveHolidays(
    userId: string,
    holidays: Holiday[],
  ): Promise<string> {
    const parsedUserId = +userId;
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid user ID');
    }

    await this.prisma.event.createMany({
      data: holidays.map((holiday: Holiday) => ({
        userId: parsedUserId,
        name: holiday.name,
        date: new Date(holiday.date),
        countryCode: holiday.countryCode,
      })),
    });

    return 'Holidays saved successfully';
  }

  async addHolidaysToCalendar(
    userId: string,
    createCalendarDto: CreateCalendarDto,
  ): Promise<void> {
    const { countryCode, year, holidays } = createCalendarDto;

    const allHolidays: Holiday[] = await this.getHolidays(countryCode, year);

    const filteredHolidays = holidays.length
      ? allHolidays.filter((holiday) => holidays.includes(holiday.name))
      : allHolidays;

    await this.saveHolidays(userId, filteredHolidays);
  }
}

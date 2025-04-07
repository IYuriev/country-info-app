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
}

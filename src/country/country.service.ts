import { Injectable } from '@nestjs/common';
import { IBordersInfo, ICountryAvailable } from 'src/interfaces/country';
import 'dotenv/config';
import { ENDPOINTS } from 'src/constants/endpoints/country';

@Injectable()
export class CountryService {
  async getAvailableCountries(): Promise<ICountryAvailable[]> {
    const response = await fetch(
      `${process.env.COUNTRY_GENERAL_INFO_API_URL}${ENDPOINTS.AVAILABLE_COUNTRIES}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.statusText}`);
    }

    const data = (await response.json()) as ICountryAvailable[];
    return data;
  }

  private async getBorders(countryCode: string): Promise<string[]> {
    const response = await fetch(
      `${process.env.COUNTRY_GENERAL_INFO_API_URL}${ENDPOINTS.COUNTRY_INFO}/${countryCode}`,
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch country information: ${response.statusText}`,
      );
    }
    const data = (await response.json()) as IBordersInfo;
    const borders = data.borders;
    return borders;
  }
}

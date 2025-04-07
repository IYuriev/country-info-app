import { Injectable } from '@nestjs/common';
import {
  IBordersInfo,
  ICountryAvailable,
  IFlagInfo,
  IPopulationCount,
  IPopulationInfo,
} from 'src/interfaces/country';
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

  async getCountryInfo(countryCode: string) {
    const borders = await this.getBorders(countryCode);
    const population = await this.getPopulation(countryCode);
    const flagURL = await this.getFlagURL(countryCode);

    return {
      borders,
      population,
      flagURL,
    };
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

  private async getPopulation(
    countryCode: string,
  ): Promise<IPopulationCount[]> {
    const response = await fetch(
      `${process.env.COUNTRY_SPECIAL_INFO_API_URL}${ENDPOINTS.POPULATION}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch population information: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as IPopulationInfo;
    const population = data.data.find(
      (item) => item.code === countryCode,
    )?.populationCounts;

    if (!population) {
      throw new Error(
        `Population data not found for country code: ${countryCode}`,
      );
    }
    return population;
  }

  private async getFlagURL(countryCode: string): Promise<string> {
    const response = await fetch(
      `${process.env.COUNTRY_SPECIAL_INFO_API_URL}${ENDPOINTS.FLAG}`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch flag information: ${response.statusText}`,
      );
    }

    const data = (await response.json()) as IFlagInfo;
    const flagURL = data.data.find((item) => item.iso2 === countryCode)?.flag;

    if (!flagURL) {
      throw new Error(`Flag URL not found for country code: ${countryCode}`);
    }
    return flagURL;
  }
}

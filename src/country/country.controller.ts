import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';
import { ICountryAvailable } from 'src/interfaces/country';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/available')
  async getAvailableCountries(): Promise<ICountryAvailable[]> {
    return await this.countryService.getAvailableCountries();
  }
}

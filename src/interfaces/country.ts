export interface ICountryAvailable {
  string: string[];
}

export interface IBordersInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

export interface IPopulationInfo {
  error: boolean;
  msg: string;
  data: IPopulationData[];
}

export interface IPopulationData {
  country: string;
  code: string;
  iso3: string;
  populationCounts: IPopulationCount[];
}

export interface IPopulationCount {
  year: number;
  value: number;
}

export interface IFlagInfo {
  error: boolean;
  msg: string;
  data: IFlagData[];
}
export interface IFlagData {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

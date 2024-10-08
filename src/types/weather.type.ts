export type LocationType = {
  name: string;
  country: string;
  region: string;
  localtime: string;
};

export type CurrentWeatherType = {
  weather_icons: string[];
  weather_descriptions: string[];
  observation_time: '12:14 PM';
  temperature: number;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  pressure: number;
  precip: number;
  humidity: number;
  cloudcover: number;
  feelslike: number;
  uv_index: number;
  visibility: number;
};

export interface ListWeatherData {
  id: string;
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

type ErrorType = {
  code: number;
  info: string;
};

export type CurrentLocationWeatherType = {
  location: LocationType;
  current: CurrentWeatherType;
  success?: boolean;
  error?: ErrorType;
};

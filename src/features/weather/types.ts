export interface WeatherState {
  fetching: boolean;
  city: string | null;
  days: any;
  error: string | null;
  lang: string;
  history: any;
}

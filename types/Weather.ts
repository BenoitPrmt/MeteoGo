export type WeatherType = {
    latitude: number;
    longitude: number;
    current_units: {
        temperature_2m: string;
        apparent_temperature: string;
        precipitation: string;
    },
    current: {
        time: string;
        temperature_2m: number;
        apparent_temperature: number;
        precipitation: number;
        weather_code: number;
        is_day: number;
    },
    hourly_units: {
        time: string;
        temperature_2m: string;
        precipitation_probability: string;
        wind_speed_10m: string;
    },
    hourly: {
        time: string[];
        temperature_2m: number[];
        precipitation_probability: number[];
        wind_speed_10m: number[];
    },
    daily_units: {
        time: string;
        temperature_2m_max: string;
        temperature_2m_min: string;
        sunrise: string;
        sunset: string;
    },
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
    }
}
export type GeocodingResultType = {
    results: CityType[];
}

export type CityType = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country_code: string;
    timezone: string;
    population: number;
    postcodes: string[];
    country_id: number;
    country: string;
    admin1: string;
    admin2: string;
}
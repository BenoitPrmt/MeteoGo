import {StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Heading} from "@/components/ui/heading";
import {Center} from "@/components/ui/center";
import {VStack} from "@/components/ui/vstack";
import {useEffect, useState} from "react";
import {Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {Skeleton} from "@/components/ui/skeleton";
import {Image} from "@/components/ui/image";
import {WMO_ICONS} from "@/constants/WMO";
import WeatherChart from "@/components/WeatherChart";

type GeocodingResultType = {
    results: CityType[];
}

type CityType = {
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

type WeatherType = {
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
    }
}

export default function HomeScreen() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [city, setCity] = useState<CityType>()
    const [weather, setWeather] = useState<WeatherType>();

    const screenWidth = Dimensions.get("window").width;

    const handleRefresh = async () => {
        setIsRefreshing(true);
        loadData();
        setIsRefreshing(false);
    };

    const loadData = async () => {
        fetch("https://geocoding-api.open-meteo.com/v1/search?name=Orléans&count=10&language=fr&format=json").then(async (response) => {
            const json: GeocodingResultType = await response.json();
            const cityData: CityType = json.results[0];
            setCity(cityData);
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityData.latitude}&longitude=${cityData.longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code&hourly=temperature_2m,precipitation_probability,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`)
                .then(async (resp) => {
                    const weatherData: WeatherType = await resp.json();
                    const now: Date = new Date();
                    weatherData.hourly.time = weatherData.hourly.time
                        .filter((time: string) => new Date(time) > now)
                        .map((time: string) => `+${new Date(time).getHours() - now.getHours()}`);
                    setWeather(weatherData);
                })
        });
    }

    useEffect(() => {
        loadData().then(() => console.log("Données chargées"));
    }, []);

    const chartConfig = {
        backgroundColor: "#0062e2",
        backgroundGradientFrom: "#0064fb",
        backgroundGradientTo: "#2693ff",
        decimalPlaces: 1,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "2",
            strokeWidth: "1",
        }
    };

    const dataTemperatures = {
        labels: weather?.hourly.time,
        datasets: [
            {
                data: weather?.hourly.temperature_2m,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            }
        ],
    };

    const dataPrecipitations = {
        labels: weather?.hourly.time,
        datasets: [
            {
                data: weather?.hourly.precipitation_probability,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            }
        ],
    };

    const dataWind = {
        labels: weather?.hourly.time,
        datasets: [
            {
                data: weather?.hourly.wind_speed_10m,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            }
        ],
    };

    return (
        <ParallaxScrollView
            refresh={isRefreshing}
            onRefresh={handleRefresh}
            headerBackgroundColor={{light: '#0062e2', dark: '#0062e2'}}
            headerImage={
                <VStack>
                    <Center className={"flex justify-center"}>
                        <Heading className={"font-bold text-7xl pt-10 text-white"}>
                            {weather?.current.temperature_2m}{weather?.current_units.temperature_2m}
                        </Heading>
                    </Center>
                    <Center>
                        <Heading className={"font-bold text-4xl text-white"}>
                            {city?.name}
                        </Heading>
                    </Center>
                    <Center>
                        {weather && <Image size={"md"} source={WMO_ICONS[`${weather?.current.weather_code}`].day.image} alt={WMO_ICONS[`${weather?.current.weather_code}`].day.description} /> }
                    </Center>
                </VStack>
            }>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Températures</ThemedText>
                {weather && (
                    <WeatherChart
                        // @ts-ignore
                        data={dataTemperatures}
                        width={screenWidth - 20}
                        chartConfig={chartConfig}
                        yAxisSuffix={weather.hourly_units.temperature_2m}
                    />
                )}
                {!weather && <Skeleton variant="sharp" className="h-[220px] w-full rounded-md" />}
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Probabilité de précipitations</ThemedText>
                {weather && (
                    <WeatherChart
                        // @ts-ignore
                        data={dataPrecipitations}
                        width={screenWidth - 20}
                        chartConfig={chartConfig}
                        yAxisSuffix={weather.hourly_units.precipitation_probability}
                    />
                )}
                {!weather && <Skeleton variant="sharp" className="h-[220px] w-full rounded-md" />}
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Vitesse du vent</ThemedText>
                {weather && (
                    <WeatherChart
                        // @ts-ignore
                        data={dataWind}
                        width={screenWidth - 20}
                        chartConfig={chartConfig}
                        yAxisSuffix={weather.hourly_units.wind_speed_10m}
                    />
                )}
                {!weather && <Skeleton variant="sharp" className="h-[220px] w-full rounded-md" />}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    weatherIcon: {
        height: 200,
        width: 200,
        // bottom: 0,
        // left: 30,
        position: 'absolute',
    },
});

import {StyleSheet, View} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Heading} from "@/components/ui/heading";
import {Center} from "@/components/ui/center";
import {VStack} from "@/components/ui/vstack";
import {useEffect, useState} from "react";
import {Dimensions} from "react-native";
import {Skeleton} from "@/components/ui/skeleton";
import {Image} from "@/components/ui/image";
import {WMO_ICONS} from "@/constants/WMO";
import WeatherChart from "@/components/WeatherChart";
import {CHART_CONFIG} from "@/constants/Chart";
import {LineChartData} from "react-native-chart-kit/dist/line-chart/LineChart";
import {Pressable} from "@/components/ui/pressable";
import CityDetails from "@/components/CityDetails";
import cityDetails from "@/components/CityDetails";
import {CityType, GeocodingResultType} from "@/types/City";
import {WeatherType} from "@/types/Weather";
import {Fab, FabIcon, FabLabel} from "@/components/ui/fab";
import {AddIcon, Icon} from "@/components/ui/icon";
import {
    ArrowDownIcon,
    ArrowDownUpIcon,
    ArrowUpIcon, SearchIcon,
    SunriseIcon,
    SunsetIcon,
    ThermometerSunIcon
} from "lucide-react-native";
import ChangeCity from "@/components/ChangeCity";
import {Divider} from "@/components/ui/divider";
import {HStack} from "@/components/ui/hstack";


export default function HomeScreen() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [cityName, setCityName] = useState<string>("Orléans")
    const [city, setCity] = useState<CityType>()
    const [weather, setWeather] = useState<WeatherType>();

    const [isCityDetailsOpen, setCityDetailsOpen] = useState<boolean>(false);
    const [isChangeCityOpen, setChangeCityOpen] = useState<boolean>(false);

    const screenWidth = Dimensions.get("window").width;

    const handleOpenCityDetails = () => {
        setCityDetailsOpen(true);
    }

    const handleCloseCityDetails = () => {
        setCityDetailsOpen(false);
    }

    const handleOpenChangeCity = () => {
        setChangeCityOpen(true);
    }

    const handleCloseChangeCity = () => {
        setChangeCityOpen(false);
    }

    const handleRefresh = async () => {
        setIsRefreshing(true);
        loadData();
        setIsRefreshing(false);
    };

    const handleFabPress = () => {
        setChangeCityOpen(true);
    };

    const loadData = async () => {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=fr&format=json`).then(async (response) => {
            const json: GeocodingResultType = await response.json();
            const cityData: CityType = json.results[0];
            setCity(cityData);
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityData.latitude}&longitude=${cityData.longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,is_day&hourly=temperature_2m,precipitation_probability,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&forecast_days=1`)
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
        loadData().then(() => console.log("Données de la nouvelle ville chargées"));
    }, [cityName]);

    const dataTemperatures: LineChartData = {
        labels: weather?.hourly.time || [],
        datasets: [
            {
                data: weather?.hourly.temperature_2m || [],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            }
        ],
    };

    const dataPrecipitations: LineChartData = {
        labels: weather?.hourly.time || [],
        datasets: [
            {
                data: weather?.hourly.precipitation_probability || [],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            }
        ],
    };

    const dataWind: LineChartData = {
        labels: weather?.hourly.time || [],
        datasets: [
            {
                data: weather?.hourly.wind_speed_10m || [],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            }
        ],
    };

    return (
        <ThemedView style={{flex: 1}}>
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
                            <Pressable onPress={handleOpenCityDetails}>
                                <Heading className={"font-bold text-4xl text-white"}>
                                    {city?.name}
                                </Heading>
                            </Pressable>
                        </Center>
                        <Center>
                            {weather &&
                                <Image size={"md"} source={WMO_ICONS[`${weather?.current.weather_code}`][`${weather?.current.is_day ? 'day' : 'night'}`].image}
                                       alt={WMO_ICONS[`${weather?.current.weather_code}`][`${weather?.current.is_day ? 'day' : 'night'}`].description}/>}
                        </Center>
                    </VStack>
                }>
                <ThemedView style={styles.stepContainer}>

                    <Center>
                        <HStack space={"3xl"}>
                            <VStack>
                                <Center>
                                    <Icon as={ThermometerSunIcon} color={"#2f3370"}/>
                                    <Heading className={"font-bold text-xl text-[#2f3370]"}>
                                        {weather?.current.apparent_temperature}{weather?.current_units.apparent_temperature}
                                    </Heading>
                                </Center>
                            </VStack>

                            <VStack>
                                <Center>
                                    <Icon as={ArrowDownIcon} color={"#208eff"}/>
                                    <Heading className={"font-bold text-xl text-[#208eff]"}>
                                        {weather?.daily.temperature_2m_min}{weather?.daily_units.temperature_2m_min}
                                    </Heading>
                                </Center>
                            </VStack>

                            <VStack>
                                <Center>
                                    <Icon as={ArrowUpIcon} color={"#ff2937"}/>
                                    <Heading className={"font-bold text-xl text-[#ff2937]"}>
                                        {weather?.daily.temperature_2m_max}{weather?.daily_units.temperature_2m_max}
                                    </Heading>
                                </Center>
                            </VStack>
                            {/*</HStack>*/}
                            {/*<HStack space={"4xl"} className={'pt-2'}>*/}
                            <VStack>
                                <Center>
                                    <Icon as={SunriseIcon} color={"#ffb32e"}/>
                                    <Heading className={"font-bold text-xl text-[#ffb32e]"}>
                                        {/* @ts-ignore */}
                                        {new Date(weather?.daily.sunrise).toLocaleTimeString('fr-FR').slice(0, 5)}
                                    </Heading>
                                </Center>
                            </VStack>

                            <VStack>
                                <Center>
                                    <Icon as={SunsetIcon} color={"#fa3d75"}/>
                                    <Heading className={"font-bold text-xl text-[#fa3d75]"}>
                                        {/* @ts-ignore */}
                                        {new Date(weather?.daily.sunset).toLocaleTimeString('fr-FR').slice(0, 5)}
                                    </Heading>
                                </Center>
                            </VStack>
                        </HStack>
                    </Center>

                    <Divider className="my-0.5"/>
                    <ThemedText type="subtitle">Températures</ThemedText>
                    {weather && (
                        <WeatherChart
                            data={dataTemperatures}
                            width={screenWidth - 20}
                            chartConfig={CHART_CONFIG}
                            yAxisSuffix={weather.hourly_units.temperature_2m}
                        />
                    )}
                    {!weather && <Skeleton variant="sharp" className="h-[220px] w-full rounded-md"/>}

                    <ThemedText type="subtitle">Probabilité de précipitations</ThemedText>
                    {weather && (
                        <WeatherChart
                            data={dataPrecipitations}
                            width={screenWidth - 20}
                            chartConfig={CHART_CONFIG}
                            yAxisSuffix={weather.hourly_units.precipitation_probability}
                        />
                    )}
                    {!weather && <Skeleton variant="sharp" className="h-[220px] w-full rounded-md"/>}

                    <ThemedText type="subtitle">Vitesse du vent</ThemedText>
                    {weather && (
                        <WeatherChart
                            data={dataWind}
                            width={screenWidth - 20}
                            chartConfig={CHART_CONFIG}
                            yAxisSuffix={weather.hourly_units.wind_speed_10m}
                        />
                    )}
                    {!weather && <Skeleton variant="sharp" className="h-[220px] w-full rounded-md"/>}
                </ThemedView>
            </ParallaxScrollView>

            <Fab
                size="md"
                placement="bottom center"
                isHovered={false}
                isDisabled={false}
                isPressed={false}
                style={styles.fab}
                onPress={handleFabPress}
            >
                <FabIcon as={SearchIcon}/>
                <FabLabel className={"font-bold"}>Voir une autre ville</FabLabel>
            </Fab>

            {city && <CityDetails isOpen={isCityDetailsOpen} handleClose={handleCloseCityDetails} city={city}/>}
            <ChangeCity isOpen={isChangeCityOpen} handleClose={handleCloseChangeCity} setCity={setCityName}/>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        flex: 1,
        gap: 8,
        marginBottom: 8,
    },
    weatherIcon: {
        height: 200,
        width: 200,
        position: 'absolute',
    },
    fab: {
        position: 'absolute',
        bottom: 100,
        zIndex: 1000,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

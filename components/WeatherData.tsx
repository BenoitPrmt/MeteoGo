import React from 'react';
import {Center} from "@/components/ui/center";
import {Icon} from "@/components/ui/icon";
import {SunsetIcon} from "lucide-react-native";
import {Heading} from "@/components/ui/heading";
import {SkeletonText} from "@/components/ui/skeleton";
import {VStack} from "@/components/ui/vstack";
import {WeatherType} from "@/types/Weather";

type Props = {
    icon: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
    color: string;
    weather: WeatherType|undefined;
    data: string;
}

const WeatherData = ({ icon, color, weather, data }: Props) => {
    return (
        <VStack>
            <Center>
                <Icon as={icon} color={color}/>

                {weather && (
                    <Heading className={`font-bold text-xl text-[${color}]`}>
                        {data}
                    </Heading>
                )}

                {!weather && <SkeletonText _lines={1} className="h-5 mt-2 w-10" />}
            </Center>
        </VStack>
    );
};

export default WeatherData;
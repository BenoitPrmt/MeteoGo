import React from 'react';
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper, ActionsheetItem,
    ActionsheetItemText
} from "@/components/ui/actionsheet";
import {Badge, BadgeIcon, BadgeText} from "@/components/ui/badge";
import {Users} from "lucide-react-native";
import {CityType} from "@/types/City";
import {formatThousands} from "@/utils/numbers";
import {Image} from "@/components/ui/image";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    city: CityType;
}

const CityDetails = ({ isOpen, handleClose, city }: Props) => {
    return (
        <Actionsheet isOpen={isOpen} onClose={handleClose}>
            <ActionsheetBackdrop/>
            <ActionsheetContent>
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator/>
                </ActionsheetDragIndicatorWrapper>
                <ActionsheetItem>
                    <ActionsheetItemText className={"text-3xl font-bold text-gray-900"}>
                        {city.name}
                    </ActionsheetItemText>
                    <Image source={`https://flagsapi.com/${city.country_code}/flat/64.png`} size={"xs"} />
                </ActionsheetItem>

                <ActionsheetItem>
                    <ActionsheetItemText className={`text-lg`}>
                        {city.admin1}, {city.admin2}
                    </ActionsheetItemText>
                </ActionsheetItem>

                <ActionsheetItem className={"pb-10"}>
                    <Badge size="md" variant="solid" action="info">
                        <BadgeIcon as={Users} className="mr-2"/>
                        <BadgeText>{formatThousands(city.population)} habitants</BadgeText>
                    </Badge>
                </ActionsheetItem>
            </ActionsheetContent>
        </Actionsheet>
    );
};

export default CityDetails;
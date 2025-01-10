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
import {Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import {SunMediumIcon, Users} from "lucide-react-native";
import {CityType} from "@/types/City";
import {formatThousands} from "@/utils/numbers";

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
                </ActionsheetItem>

                <ActionsheetItem>
                    <ActionsheetItemText className={`text-lg`}>
                        {city.admin1}, {city.admin2}
                    </ActionsheetItemText>
                </ActionsheetItem>

                <ActionsheetItem>
                    <Badge size="md" variant="solid" action="info">
                        <BadgeIcon as={Users} className="mr-2"/>
                        <BadgeText>{formatThousands(city.population)} habitants</BadgeText>
                    </Badge>
                </ActionsheetItem>

                <ActionsheetItem className={"mb-10 display:flex justify-center"}>
                    <Button size="md" variant="solid" action="primary" onPress={() => console.log('Changer de ville')}>
                        <ButtonIcon as={SunMediumIcon}/>
                        <ButtonText>Voir une autre ville</ButtonText>
                    </Button>
                </ActionsheetItem>
            </ActionsheetContent>
        </Actionsheet>
    );
};

export default CityDetails;
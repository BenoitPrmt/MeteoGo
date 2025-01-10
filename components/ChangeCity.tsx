import React, {useEffect, useState} from 'react';
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
import {SearchIcon, SunMediumIcon, Users} from "lucide-react-native";
import {CityType} from "@/types/City";
import {formatThousands} from "@/utils/numbers";
import {Input, InputField} from "@/components/ui/input";
import {Keyboard, KeyboardAvoidingView, Platform} from "react-native";

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    setCity: (text: string) => void;
}

const ChangeCity = ({isOpen, handleClose, setCity}: Props) => {
    const [cityName, setCityName] = useState<string>("");

    const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(true);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSearch = () => {
        setCity(cityName);
        handleClose();
    }

    return (
        <Actionsheet isOpen={isOpen} onClose={handleClose}>
            <ActionsheetBackdrop/>
            <ActionsheetContent
                style={{
                    paddingBottom: isKeyboardVisible ? 300 : 0
                }}
            >
                <ActionsheetDragIndicatorWrapper>
                    <ActionsheetDragIndicator/>
                </ActionsheetDragIndicatorWrapper>
                <ActionsheetItem>
                    <Input variant="outline" size="md" className={"w-full"}>
                        <InputField
                            placeholder='Cherchez une ville...'
                            defaultValue={cityName}
                            onChangeText={(text: string) => setCityName(text)}
                            autoFocus={true}
                        />
                    </Input>
                </ActionsheetItem>

                <ActionsheetItem className={"mb-10 display:flex justify-center"}>
                    <Button size="md" variant="solid" action="primary" onPress={handleSearch}>
                        <ButtonIcon as={SearchIcon}/>
                        <ButtonText>Rechercher</ButtonText>
                    </Button>
                </ActionsheetItem>
            </ActionsheetContent>
        </Actionsheet>
    );
};

export default ChangeCity;
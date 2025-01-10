import { StyleSheet } from 'react-native';

import ContainerScrollView from "@/components/ContainerScrollView";
import {ThemedText} from "@/components/ThemedText";
import {Heading} from "@/components/ui/heading";
import {Text} from "@/components/ui/text";
import {Link} from "expo-router";
import {VStack} from "@/components/ui/vstack";
import {
    GithubIcon,
    Globe, HouseIcon,
    LinkedinIcon,
    ParkingCircle,
} from "lucide-react-native";
import {Icon} from "@/components/ui/icon";
import {HStack} from "@/components/ui/hstack";

export default function TabTwoScreen() {
    return (
        <ContainerScrollView>
            <Heading size={"2xl"}>⚡️À propos</Heading>
            <Heading size={"xl"}>✨ L'application</Heading>
            <ThemedText>
                Ce projet est une application mobile météo. Je l'ai réalisée dans le cadre d'un cours de développement mobile à Coda. Elle a été développée avec React Native et Expo.
            </ThemedText>
            <Heading size={"xl"}>👨‍💻 Le développeur</Heading>
            <ThemedText>
                Je m'appelle <Text className="font-bold">Benoît Parmentier</Text>. Je suis un développeur passionné par la création d'applications mobiles et de sites web.
            </ThemedText>
            <Heading size={"xl"}>☎️ Me contacter</Heading>
            <VStack space={"md"}>
                <Link href={"mailto:hello@benoit.fun"}>
                    <ThemedText>
                        Vous pouvez me contacter par email à <Text className="font-bold text-blue-700">hello@benoit.fun</Text>
                    </ThemedText>
                </Link>
                <Link href={"https://benoit.fun"}>
                    <HStack space={"sm"} className={"items-center"}>
                        <Icon size={"md"} as={Globe} className="text-blue-700" />
                        <Text className="font-bold text-blue-700">
                            benoit.fun
                        </Text>
                    </HStack>
                </Link>

                <Link href={"https://www.linkedin.com/in/benoit-parmentier/"}>
                    <HStack space={"sm"} className={"items-center"}>
                        <Icon size={"md"} as={LinkedinIcon} className="text-linkedin" />
                        <Text className="font-bold text-linkedin">
                            LinkedIn
                        </Text>
                    </HStack>
                </Link>

                <Link href={"https://github.com/BenoitPrmt"}>
                    <HStack space={"sm"} className={"items-center"}>
                        <Icon size={"md"} as={GithubIcon} className="text-github" />
                        <Text className="font-bold text-github">
                            GitHub
                        </Text>
                    </HStack>
                </Link>
            </VStack>

            <Heading size={"xl"}>📚 Autres projets</Heading>
            <VStack space={"md"}>
                <Link href={"https://viteuneplace.fr"}>
                    <HStack space={"sm"} className={"items-center"}>
                        <Icon size={"md"} as={ParkingCircle} className="text-viteuneplace" />
                        <Text className="font-bold text-viteuneplace">
                            viteuneplace.fr - Parkings à Orléans
                        </Text>
                    </HStack>
                </Link>

                <Link href={"https://colocplus.com"}>
                    <HStack space={"sm"} className={"items-center"}>
                        <Icon size={"md"} as={HouseIcon} className="text-colocplus" />
                        <Text className="font-bold text-colocplus">
                            Coloc+ - Gérez votre coloc' facilement
                        </Text>
                    </HStack>
                </Link>
            </VStack>
        </ContainerScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});

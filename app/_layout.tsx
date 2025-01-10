import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {StyleSheet} from "react-native";
import { StatusBar as SttusBar } from 'react-native';
import {useColorScheme} from '@/hooks/useColorScheme';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GluestackUIProvider mode="light">
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <SafeAreaProvider>
                    <SafeAreaView style={styles.container} edges={['top']}>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                            <Stack.Screen name="+not-found"/>
                        </Stack>
                        <StatusBar style="auto"/>
                    </SafeAreaView>
                </SafeAreaProvider>
            </ThemeProvider>
        </GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: SttusBar.currentHeight,
    },
});
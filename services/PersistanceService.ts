import {CityType} from "@/types/City";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class PersistanceService {
    public static async saveCity(city: string) {
        await AsyncStorage.setItem("city", city);
    }

    public static async getSavedCity(): Promise<string | null> {
        return await AsyncStorage.getItem("city");
    }
}
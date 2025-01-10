import {AbstractChartConfig} from "react-native-chart-kit/dist/AbstractChart";

export const CHART_CONFIG: AbstractChartConfig = {
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
}
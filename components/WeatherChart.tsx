import React from 'react';
import {LineChart} from "react-native-chart-kit";
import {LineChartData} from "react-native-chart-kit/dist/line-chart/LineChart";
import {AbstractChartConfig} from "react-native-chart-kit/dist/AbstractChart";

type Props = {
    data: LineChartData;
    width: number;
    chartConfig: AbstractChartConfig;
    yAxisSuffix: string;
}

const WeatherChart = ({ data, width, chartConfig, yAxisSuffix }: Props) => {
    return (
        <LineChart
            data={data}
            width={width}
            height={220}
            chartConfig={chartConfig}
            yAxisSuffix={yAxisSuffix}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 8,
                marginLeft: -10
            }}
        />
    );
};

export default WeatherChart;
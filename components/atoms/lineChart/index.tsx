import React, { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import colors from "styles/colors.module.scss";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartProps {
    title: string;
    labels: string[];
    data: number[];
    dataSetTitle: string;
}

const LineChart = ({ title, labels, data, dataSetTitle }: LineChartProps) => {
    const options = useMemo(
        () => ({
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom" as const,
                },
                title: {
                    display: title,
                    text: title,
                    align: "start",
                },
            },
        }),
        [title]
    );

    const dataForChart = useMemo(
        () => ({
            labels,
            datasets: [
                {
                    label: dataSetTitle,
                    data: Array.isArray(data) ? data : [],
                    backgroundColor: colors.primaryColor,
                },
            ],
        }),
        [data]
    );

    return <Line options={options} data={dataForChart} />;
};

LineChart.propTypes = {};

export default LineChart;

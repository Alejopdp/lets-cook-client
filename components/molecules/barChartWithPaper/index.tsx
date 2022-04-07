import React from "react";
import PropTypes from "prop-types";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.font.size = 16;
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "bottom" as const,
        },
    },
};
interface BarChartWithPaperProps {
    title: string;
    labels: string[];
    firstData: number[];
    secondData: number[];
}

const BarChartWithPaper = ({ title, labels, firstData, secondData }: BarChartWithPaperProps) => {
    const getData = () => {
        let counter = 0;

        return {
            labels,
            datasets: [
                {
                    label: "Ya eligió recetas",
                    data: labels.map((label, index) => {
                        return firstData[index];
                    }),
                    backgroundColor: "rgba(0, 165, 85, 0.5)",
                },
                {
                    label: "No eligió recetas",
                    data: labels.map((label, index) => {
                        return secondData[index];
                    }),

                    backgroundColor: "rgba(0, 165, 85, 0.2)",
                },
            ],
        };
    };

    return (
        <PaperWithTitleContainer flex={true} title={title} fullWidth={true} fontSize={20}>
            <Bar options={options} data={getData()} />;
        </PaperWithTitleContainer>
    );
};

BarChartWithPaper.propTypes = {};

export default BarChartWithPaper;

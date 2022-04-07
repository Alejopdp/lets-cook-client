import React from "react";
import PropTypes from "prop-types";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Subtitle",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const getData = () => {
    let counter = 0;

    return {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                data: labels.map((label, index) => {
                    return counter + index;
                }),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Dataset 2",
                data: labels.map((label, index) => {
                    return counter + index + 20;
                }),

                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
};

interface BarChartWithPaperProps {
    title: string;
}

const BarChartWithPaper = ({ title }: BarChartWithPaperProps) => {
    return (
        <PaperWithTitleContainer flex={true} title={title} fullWidth fontSize={20}>
            <Bar options={options} data={getData()} />;
        </PaperWithTitleContainer>
    );
};

BarChartWithPaper.propTypes = {};

export default BarChartWithPaper;

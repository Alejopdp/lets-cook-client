import React from "react";
import PropTypes from "prop-types";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import LineChart from "components/atoms/lineChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartWithPaperProps {
    title: string;
    lineChartLabels: string[];
    lineChartData: number[];
    lineChartDataTitle: string;
    linechartDataSetTitle: string;
}

const LineChartWithPaper = ({
    title,
    lineChartData,
    lineChartDataTitle,
    lineChartLabels,
    linechartDataSetTitle,
}: LineChartWithPaperProps) => {
    return (
        <PaperWithTitleContainer flex={true} title={title} fullWidth={true} fontSize={20}>
            <LineChart labels={lineChartLabels} data={lineChartData} title={lineChartDataTitle} dataSetTitle={linechartDataSetTitle} />
        </PaperWithTitleContainer>
    );
};

LineChartWithPaper.propTypes = {};

export default LineChartWithPaper;

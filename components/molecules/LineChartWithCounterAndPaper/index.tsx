import React, { useMemo } from "react";
import PropTypes from "prop-types";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import MetricCounter from "components/atoms/metricCounter";
import { Box } from "@material-ui/core";
import LineChart from "components/atoms/lineChart";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LineChartWithCounterAndPaperProps {
    title: string;
    totalCount: number;
    type: "money" | "bigNumber";
    lineChartLabels: string[];
    lineChartData: number[];
    lineChartDataTitle: string;
    linechartDataSetTitle: string;
    subtitle?: string;
}

const LineChartWithCounterAndPaper = ({
    title,
    subtitle,
    totalCount,
    type,
    lineChartData,
    lineChartDataTitle,
    lineChartLabels,
    linechartDataSetTitle,
}: LineChartWithCounterAndPaperProps) => {
    return (
        <PaperWithTitleContainer flex={true} title={title} fullWidth={true} fontSize={20}>
            <Box mb={subtitle ? 2 : 0}>
                <MetricCounter value={totalCount} type={type} />
            </Box>
            <LineChart labels={lineChartLabels} data={lineChartData} title={lineChartDataTitle} dataSetTitle={linechartDataSetTitle} />
        </PaperWithTitleContainer>
    );
};

LineChartWithCounterAndPaper.propTypes = {};

export default LineChartWithCounterAndPaper;

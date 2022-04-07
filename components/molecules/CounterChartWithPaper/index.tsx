import React from "react";
import { Typography } from "@material-ui/core";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";
import { numberCompactFormatter } from "helpers/utils/utils";
import MetricCounter from "components/atoms/metricCounter";

interface CounterChartWithPaperProps {
    title: string;
    count: number;
    type: "money" | "bigNumber";
}

const CounterChartWithPaper = ({ title, count, type }: CounterChartWithPaperProps) => {
    return (
        <PaperWithTitleContainer flex={true} title={title} fullWidth fontSize={20}>
            <MetricCounter type={type} value={count} />
        </PaperWithTitleContainer>
    );
};

CounterChartWithPaper.propTypes = {};

export default CounterChartWithPaper;

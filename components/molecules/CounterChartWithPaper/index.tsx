import React from "react";
import { Typography } from "@material-ui/core";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";
import { numberCompactFormatter } from "helpers/utils/utils";

interface CounterChartWithPaperProps {
    title: string;
    count: number;
}

const CounterChartWithPaper = ({ title, count }: CounterChartWithPaperProps) => {
    return (
        <PaperWithTitleContainer flex={true} title={title} fullWidth fontSize={20}>
            <Typography style={{ fontSize: 60, fontWeight: 600 }}>{numberCompactFormatter(count)}</Typography>
        </PaperWithTitleContainer>
    );
};

CounterChartWithPaper.propTypes = {};

export default CounterChartWithPaper;

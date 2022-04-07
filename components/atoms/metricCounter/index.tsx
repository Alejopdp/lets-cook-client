import React, { useMemo } from "react";
import { numberCompactFormatter, numberMoneyFormatter } from "helpers/utils/utils";
import { Typography } from "@material-ui/core";

interface MetricCounterProps {
    value: number;
    type: "money" | "bigNumber";
}

const MetricCounter = ({ value, type }: MetricCounterProps) => {
    const formattedValue = useMemo(() => (type === "money" ? numberMoneyFormatter(value) : numberCompactFormatter(value)), [type]);
    return <Typography style={{ fontSize: 60, fontWeight: 600 }}>{formattedValue}</Typography>;
};

export default MetricCounter;

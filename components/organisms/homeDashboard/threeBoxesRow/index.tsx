import React, { ReactChild } from "react";
import { Grid } from "@material-ui/core";

interface TrheeBoesRowProps {
    firstBox: ReactChild;
    secondBox: ReactChild;
    thirdBox?: ReactChild;
}

const ThreeBoxesRow = ({ firstBox, secondBox, thirdBox }: TrheeBoesRowProps) => {
    return (
        <>
            <Grid item xs={12} md={4}>
                {firstBox}
            </Grid>
            <Grid item xs={12} md={4}>
                {secondBox}
            </Grid>
            <Grid item xs={12} md={4}>
                {thirdBox}
            </Grid>
        </>
    );
};

ThreeBoxesRow.propTypes = {};

export default ThreeBoxesRow;

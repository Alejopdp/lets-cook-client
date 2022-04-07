import React, { ReactChild } from "react";
import { Grid } from "@material-ui/core";

interface FourBoxesRowProps {
    firstBox: ReactChild;
    secondBox: ReactChild;
    thirdBox: ReactChild;
    fourthBox: ReactChild;
}

const FourBoxesRow = ({ firstBox, secondBox, thirdBox, fourthBox }: FourBoxesRowProps) => {
    return (
        <>
            <Grid item xs={6} md={3}>
                {firstBox}
            </Grid>
            <Grid item xs={6} md={3}>
                {secondBox}
            </Grid>
            <Grid item xs={6} md={3}>
                {thirdBox}
            </Grid>
            <Grid item xs={6} md={3}>
                {fourthBox}
            </Grid>
        </>
    );
};

FourBoxesRow.propTypes = {};

export default FourBoxesRow;

import React, { ReactChild } from "react";
import { Grid } from "@material-ui/core";

interface TwoBoxesRowProps {
    firstBox: ReactChild;
    secondBox: ReactChild;
}

const TwoBoxesRow = ({ firstBox, secondBox }: TwoBoxesRowProps) => {
    return (
        <>
            <Grid item xs={12} md={6}>
                {firstBox}
            </Grid>
            <Grid item xs={12} md={6}>
                {secondBox}
            </Grid>
        </>
    );
};

TwoBoxesRow.propTypes = {};

export default TwoBoxesRow;

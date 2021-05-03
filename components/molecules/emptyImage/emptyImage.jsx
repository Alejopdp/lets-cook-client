import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { Grid, Typography } from "@material-ui/core";

const EmptyImage = ({ label }) => {
    return (
        <Grid container direction="column" alignItems="center">
            <Grid item>
                <Image width="150" height="100" src={`/static/images/blank-paper.png`} alt={label} />
            </Grid>
            <Grid item xs>
                <Typography variant="body2">{label}</Typography>
            </Grid>
        </Grid>
    );
};

EmptyImage.propTypes = {
    label: PropTypes.string,
};

export default EmptyImage;

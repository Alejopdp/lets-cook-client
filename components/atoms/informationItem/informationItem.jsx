// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Internal components

const InformationItem = (props) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="body1" color="textPrimary" style={{ fontWeight: "Bold" }}>
                    {props.itemName}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1" color="textPrimary" align="left">
                    {props.itemValue}
                </Typography>
            </Grid>
        </Grid>
    );
};

InformationItem.propTypes = {
    itemName: PropTypes.string.isRequired,
    itemValue: PropTypes.string.isRequired,
};

export default InformationItem;

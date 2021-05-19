// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components

// Images & icons
import ArrowBack from "@material-ui/icons/ArrowBack";

const DasboardWithBackTitle = (props) => {
    const router = useRouter();

    return (
        <Grid item xs={12}>
            <Box display="inline-flex" alignItems="center" onClick={() => (props.handleClick ? props.handleClick() : router.back())} style={{ cursor: "pointer" }} >
                <Box display="flex" marginRight={1}>
                    <ArrowBack fontSize="24px" />
                </Box>
                <Typography variant="h5">
                    {props.title}
                </Typography>
            </Box>
        </Grid>
    );
};

DasboardWithBackTitle.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string.isRequired,
};

export default DasboardWithBackTitle;

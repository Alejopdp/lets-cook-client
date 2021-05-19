// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// Internal components

const ErrorPage = (props) => {
    return (
        <>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                    <Image width="150" height="100" src={`/static/images/blank-paper.png`} alt={"Error"} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" style={{ fontWeight: "Bold", fontSize: 16, textAlign: "center" }}>
                    {props.errorMessage}
                </Typography>
            </Grid>
        </>
    );
};

ErrorPage.propTypes = {
    errorMessage: PropTypes.string.isRequired,
};

export default ErrorPage;

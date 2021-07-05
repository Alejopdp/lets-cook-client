// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components

const DashboardContainer = (props) => {
    return (
        <Container maxWidth={props.maxWidth || "lg"} style={{ width: "100%", paddingTop: 100, paddingBottom: 64 }}>
            <Grid container spacing={2}>
                {props.children}
            </Grid>
        </Container>
    );
};

DashboardContainer.propTypes = {};

export default DashboardContainer;

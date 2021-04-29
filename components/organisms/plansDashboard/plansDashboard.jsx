// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components
import CreateButton from "../../atoms/button/button";

const PlansDashboard = (props) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5">Planes</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

PlansDashboard.propTypes = {};

export default PlansDashboard;

// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").updateUserDashboard;

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components
import DashboardTitle from "../../layout/dashboardTitleWithBackButton";
import CreateUser from "../createUserDashboard/createUser";

const UpdateUserDashboard = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DashboardTitle title={lang.dashboardTitle} />
                </Grid>
                <Grid item xs={12}>
                    <CreateUser roles={props.roles} user={props.user} buttonText={lang.buttonText} />
                </Grid>
            </Grid>
        </Container>
    );
};

UpdateUserDashboard.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: PropTypes.any.isRequired,
};

export default UpdateUserDashboard;

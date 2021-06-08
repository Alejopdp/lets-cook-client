// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").createUser;

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components
import DashboardTitle from "../../layout/dashboardTitleWithBackButton";
import CreateUser from "./createUser";

const CreateUserDashboard = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DashboardTitle title={lang.dashboardTitle} />
                </Grid>
                <Grid item xs={12}>
                    <CreateUser creation roles={props.roles} user={{}} buttonText={lang.buttonText} />
                </Grid>
            </Grid>
        </Container>
    );
};

CreateUserDashboard.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CreateUserDashboard;

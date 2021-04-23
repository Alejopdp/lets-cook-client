// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components
import UsersTable from "./usersTable";

const UsersDashboard = (props) => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <UsersTable />
                </Grid>
            </Grid>
        </Container>
    );
};

UsersDashboard.propTypes = {};

export default UsersDashboard;

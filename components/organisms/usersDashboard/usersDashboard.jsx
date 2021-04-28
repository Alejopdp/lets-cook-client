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
                    <UsersTable rows={props.users} />
                </Grid>
            </Grid>
        </Container>
    );
};

UsersDashboard.propTypes = {
    users: PropTypes.array,
};

export default UsersDashboard;

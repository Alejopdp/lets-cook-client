// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";

// Internal components
import UsersTable from "./usersTable/usersTable";
import CustomButton from "../../atoms/button/button";

// Icons & images
import AddIcon from "@material-ui/icons/Add";

const UsersDashboard = (props) => {
    const router = useRouter();

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Gestión de usuarios</Typography>
                        <CustomButton
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => router.push("/gestion-de-usuarios/crear")}
                        >
                            Crear usuario
                        </CustomButton>
                    </Box>
                </Grid>

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

// Utils  & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import AddIcon from '@material-ui/icons/Add';

// Internal components
import Layout from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import UsersDashboard from "../../components/organisms/usersDashboard/usersDashboard";
import CustomButton from "../../components/atoms/button/button";

const UsersPage = (props) => {
    return (
        <Layout>
            {/* <Typography variant="h5">Gestión de usuarios</Typography>
            <CustomButton>
                <AddIcon />
                Crear usuario
            </CustomButton> */}
            <UsersDashboard />
        </Layout>
    );
};

UsersPage.propTypes = {};

export default UsersPage;

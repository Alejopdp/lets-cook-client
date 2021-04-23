// Utils  & config
import React from "react";
import PropTypes from "prop-types";

// External components

// Internal components
import Layout from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import UsersDashboard from "../../components/organisms/usersDashboard/usersDashboard";

const UsersPage = (props) => {
    return (
        <Layout>
            <UsersDashboard />
        </Layout>
    );
};

UsersPage.propTypes = {};

export default UsersPage;

// Utils  & config
import React from "react";
import PropTypes from "prop-types";

// External components

// Internal components
import Layout from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import UsersDashboard from "../../components/organisms/usersDashboard/usersDashboard";
import { getUserList } from "../../helpers/serverRequests/user";

const UsersPage = (props) => {
    return (
        <Layout>
            <UsersDashboard users={props.users} />
        </Layout>
    );
};

UsersPage.propTypes = {};

export default UsersPage;

export async function getServerSideProps(context) {
    const res = await getUserList();

    return {
        props: { users: res.data ? res.data : []},
    };
}

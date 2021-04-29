// Utils  & config
import React from "react";
import PropTypes from "prop-types";
import { getRoleList } from "../../../helpers/serverRequests/role";
import { getUserById } from "../../../helpers/serverRequests/user";

// External components

// Internal components
import Layout from "../../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import UpdateUser from "../../../components/createUser/index.js";

const UsersPage = (props) => {
    return (
        <Layout>
            <UpdateUser buttonText="MODIFICAR USUARIO" creation={false} roles={props.roles} user={props.user} />
        </Layout>
    );
};

UsersPage.propTypes = {};

export default UsersPage;

export async function getServerSideProps(context) {
    const userRes = await getUserById(context.query.id);
    const rolesRes = await getRoleList();

    return {
        props: { roles: rolesRes.data ? rolesRes.data : [], user: userRes.data ? userRes.data : {} },
    };
}

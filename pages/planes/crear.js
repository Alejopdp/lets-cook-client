// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components

// Internal components
import Layout from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import CreatePlan from "../../components/organisms/createPlan/createPlan";

const CrearPlanPage = (props) => {
    return (
        <Layout>
            <CreatePlan />
        </Layout>
    );
};

CrearPlanPage.propTypes = {};

export default CrearPlanPage;

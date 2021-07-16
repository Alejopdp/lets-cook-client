// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import CreateCustomerForm from "../createCustomerForm/createCustomerForm";

const CreateCustomer = (props) => {
    return (
        <>
            <DashboardWithBackTitle title="Crear Cliente" />
            <CreateCustomerForm />
        </>
    );
};

export default CreateCustomer;

CreateCustomer.propTypes = {

};

// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import CreateClientForm from "../createClientForm/createClientForm";

const CreateClient = (props) => {
    return (
        <Container size="md">
            <DashboardWithBackTitle title="Crear cliente" />

            <CreateClientForm />
        </Container>
    );
};

export default CreateClient;

CreateClient.propTypes = {

};

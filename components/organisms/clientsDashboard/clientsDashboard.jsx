// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import DashboardWithButton from "../../layout/dashboardTitleWithButton/dashboardTitleWithButton";

const ClientsDashboard = (props) => {

    const handleClick = () => console.log(click)

    return (
        <Container size="md">
            <DashboardWithButton title="Clientes" buttonText="Crear cliente" startIcon handleClick={handleClick} />

        </Container>
    );
};

export default ClientsDashboard;

ClientsDashboard.propTypes = {

};

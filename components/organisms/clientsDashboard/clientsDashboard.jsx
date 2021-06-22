// Utils & Config
import React, { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import DashboardWithButton from "../../layout/dashboardTitleWithButton/dashboardTitleWithButton";
import SeacrhInputField from "../../molecules/searchInputField/searchInputField";
import ClientsTable from "./clientsTable/clientsTable";

const ClientsDashboard = (props) => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/gestion-de-clientes/crear")
    }

    return (
        <Container size="md">
            <DashboardWithButton title="Clientes" buttonText="Crear cliente" startIcon handleClick={handleClick} />

            <SeacrhInputField placeholder="Buscar por nombre..." />

            <ClientsTable />
        </Container>
    );
};

export default ClientsDashboard;

ClientsDashboard.propTypes = {

};

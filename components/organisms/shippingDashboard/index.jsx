// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import DashboardWithButton from "../../layout/dashboardTitleWithButton/dashboardTitleWithButton";
import ShippingTable from "./shippingTable";

const ShippingDashboard = ({ shippingZones = [] }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push("/gestion-de-envios/crear");
    };

    return (
        <Container size="md">
            <DashboardWithButton title="Zonas de envío" buttonText="Crear zona de envío" startIcon handleClick={handleClick} />
            <ShippingTable shippingZones={shippingZones} />
        </Container>
    );
};

export default ShippingDashboard;

ShippingDashboard.propTypes = {
    shippingZones: PropTypes.array.isRequired,
};

// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { toggleZoneState, deleteZone } from "../../../helpers/serverRequests/shipping";

// External components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Internal components
import DashboardTitleWithCSV from "../../layout/dashboardTitleWithCSV/dashboardTitleWithCSV";
import SubscriptionTable from "./subscriptionTable";


const SubscriptionsDashboard = (props) => {

    const nextOrdersRows = [
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
    ]

    const handleClickExport = () => alert('Export')

    return (
        <Container>
            <DashboardTitleWithCSV title="Suscripciones" export handleClickExport={handleClickExport} />
            <SubscriptionTable rows={nextOrdersRows} />
        </Container>
    );
};

export default SubscriptionsDashboard;

SubscriptionsDashboard.propTypes = {
    // shippingZones: PropTypes.array.isRequired,
};

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
        { subscriptionId: '0', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '1', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '2', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '3', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '4', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '5', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '6', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '7', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '8', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '9', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
        { subscriptionId: '10', client: { name: 'Alejo Scotti', id: '1' }, planName: 'Plan Familiar', planVariationDescription: '3 recetas para 2 personas', frequency: 'semanal', amount: '30 EU', state: 'Activo' },
    ]

    const handleClickExport = () => alert('Export')

    return (
        <>
            <DashboardTitleWithCSV title="Suscripciones" export handleClickExport={handleClickExport} />
            <SubscriptionTable rows={nextOrdersRows} />
        </>
    );
};

export default SubscriptionsDashboard;

SubscriptionsDashboard.propTypes = {
    // shippingZones: PropTypes.array.isRequired,
};

// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { toggleZoneState, deleteZone } from "../../../helpers/serverRequests/shipping";

// External components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Internal components
// import DashboardWithButton from "../../layout/dashboardTitleWithButton/dashboardTitleWithButton";
import DashboardTitleWithCSV from "../../layout/dashboardTitleWithCSV/dashboardTitleWithCSV";
import Tabs from "../../molecules/tabs/tabs";
import OrdersTable from "./ordersTable/index";


const OrdersDashboard = (props) => {

    const nextOrdersRows = [
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PENDING' },
    ]

    const processedOrdersRows = [
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PAYMENT OK' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PAYMENT OK' },
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'PAYMENT OK' },
    ]

    const refusedOrderRows = [
        { chargeDate: '10/10/21', client: { name: 'Alejo Scotti', id: '1' }, paymentOrderId: '1', orderQuantity: '2', orderAmount: '30 EU', state: 'REFUSED' },
    ]


    const [tabValue, setTabValue] = useState(0);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const nextOrders = <OrdersTable rows={nextOrdersRows} />
    const processedOrders = <OrdersTable rows={processedOrdersRows} />
    const refusedOrder = <OrdersTable rows={refusedOrderRows} />


    const options = ['PRÓXIMAS ORDENES', 'ORDENES PROCESADAS', 'PAGOS RECHAZADOS'];
    const content = [nextOrders, processedOrders, refusedOrder];

    const handleClickImport = () => alert('Import')
    const handleClickExport = () => alert('Export')

    return (
        <>
            <DashboardTitleWithCSV title="Ordenes" import export handleClickImport={handleClickImport} handleClickExport={handleClickExport} />
            <Tabs options={options} content={content} handleChange={handleChangeTab} value={tabValue} />
        </>
    );
};

export default OrdersDashboard;

OrdersDashboard.propTypes = {
    // shippingZones: PropTypes.array.isRequired,
};

// Utils & Config
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { getPaymentOrders } from "../../../helpers/serverRequests/paymentOrder";
import { useSnackbar } from "notistack";

// External components

// Internal components
import DashboardTitleWithCSV from "../../layout/dashboardTitleWithCSV/dashboardTitleWithCSV";
import Tabs from "../../molecules/tabs/tabs";
import OrdersTable from "./ordersTable/index";
import { exportOrdersWithRecipesSelection } from "../../../helpers/serverRequests/order";

const OrdersDashboard = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [nextOrdersRows, setnextOrdersRows] = useState([]);
    const [processedOrdersRows, setprocessedOrdersRows] = useState([]);
    const [refusedOrderRows, setrefusedOrdersRows] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const getPaymentOrdersList = async () => {
            const res = await getPaymentOrders(router.locale);

            if (res.status === 200) {
                setnextOrdersRows(res.data.activeOrders);
                setprocessedOrdersRows(res.data.billedOrders);
                setrefusedOrdersRows(res.data.rejectedOrders);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getPaymentOrdersList();
    }, []);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const nextOrders = <OrdersTable rows={nextOrdersRows} />;
    const processedOrders = <OrdersTable rows={processedOrdersRows} />;
    const refusedOrder = <OrdersTable rows={refusedOrderRows} />;

    const options = ["PRÓXIMAS ORDENES", "ORDENES PROCESADAS", "PAGOS RECHAZADOS"];
    const content = [nextOrders, processedOrders, refusedOrder];

    const handleClickImport = () => alert("Import");
    const handleClickExport = async () => {
        const res = await exportOrdersWithRecipesSelection();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(!!!res ? "Ha ocurrido un error inesperado" : res.data.message, { variant: "error" });
        }
    };

    return (
        <>
            <DashboardTitleWithCSV
                title="Ordenes"
                import
                export
                handleClickImport={handleClickImport}
                handleClickExport={handleClickExport}
            />
            <Tabs options={options} content={content} handleChange={handleChangeTab} value={tabValue} />
        </>
    );
};

export default OrdersDashboard;

OrdersDashboard.propTypes = {
    // shippingZones: PropTypes.array.isRequired,
};

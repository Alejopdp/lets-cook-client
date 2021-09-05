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
import { exportOrdersWithRecipesSelection, getExportOrdersWithRecipesSelectionFilters } from "../../../helpers/serverRequests/order";
import ExportModal, { ExportOrdersFilterOptions } from "./exportModal/exportModal";

interface FilterOption {
    value: string | number;
    label: string;
}

const OrdersDashboard = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [nextOrdersRows, setnextOrdersRows] = useState([]);
    const [processedOrdersRows, setprocessedOrdersRows] = useState([]);
    const [refusedOrderRows, setrefusedOrdersRows] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [filterOptions, setfilterOptions] = useState<{
        weeks: FilterOption[];
        shippingDates: FilterOption[];
        billingDates: FilterOption[];
    }>({ weeks: [], shippingDates: [], billingDates: [] });
    const [isExportModalOpen, setisExportModalOpen] = useState(false);

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

        const getFilterOptions = async () => {
            const res = await getExportOrdersWithRecipesSelectionFilters();

            if (res && res.status === 200) {
                setfilterOptions({ weeks: res.data.weeks, billingDates: res.data.billingDates, shippingDates: res.data.shippingDates });
            }
        };

        getPaymentOrdersList();
        getFilterOptions();
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
    const handleClickExport = async (filters: { value: string; label: string }[], selectedFilter: ExportOrdersFilterOptions) => {
        var weeks: string[] = [];
        var shippingDates: string[] = [];
        var billingDates: string[] = [];

        switch (selectedFilter) {
            case ExportOrdersFilterOptions.SEMANAS:
                weeks = filters.map((item) => item.value);
                break;
            case ExportOrdersFilterOptions.FECHA_DE_ENTREGA:
                shippingDates = filters.map((item) => item.value);
                break;
            case ExportOrdersFilterOptions.FECHA_DE_COBRO:
                billingDates = filters.map((item) => item.value);
                break;
        }

        const res = await exportOrdersWithRecipesSelection({ weeks, shippingDates, billingDates });

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
                handleClickExport={() => setisExportModalOpen(true)}
            />
            <Tabs options={options} content={content} handleChange={handleChangeTab} value={tabValue} />
            <ExportModal
                open={isExportModalOpen}
                cancelButtonText="CANCELAR"
                confirmButtonText="EXPORTAR"
                handleCancelButton={() => setisExportModalOpen(false)}
                handleClose={() => setisExportModalOpen(false)}
                handleConfirmButton={handleClickExport}
                weekOptions={filterOptions.weeks}
                shippingDateOptions={filterOptions.shippingDates}
                billingDateOptions={filterOptions.billingDates}
                optionsSelected={[]}
                title="Exportar pedidos"
            />
        </>
    );
};

export default OrdersDashboard;

OrdersDashboard.propTypes = {
    // shippingZones: PropTypes.array.isRequired,
};

// Utils & Config
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { getPaymentOrders } from "../../../helpers/serverRequests/paymentOrder";
import { useSnackbar } from "notistack";
import { importRecipeSelectionForManyOrders } from "../../../helpers/serverRequests/order";

// External components
import { Box, Grid } from "@material-ui/core";

// Internal components
import DashboardTitleWithCSV from "../../layout/dashboardTitleWithCSV/dashboardTitleWithCSV";
import Tabs from "../../molecules/tabs/tabs";
import OrdersTable from "./ordersTable/index";
import { exportOrdersWithRecipesSelection, getExportOrdersWithRecipesSelectionFilters } from "../../../helpers/serverRequests/order";
import ExportModal, { ExportOrdersFilterOptions } from "./exportModal/exportModal";
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import ImportErrorModal from "./importErrorModal/importErrorModal";

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
    const [searchValue, setSearchValue] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [filterOptions, setfilterOptions] = useState<{
        weeks: FilterOption[];
        shippingDates: FilterOption[];
        billingDates: FilterOption[];
        customers: FilterOption[];
    }>({ weeks: [], shippingDates: [], billingDates: [], customers: [] });
    const [isExportModalOpen, setisExportModalOpen] = useState(false);
    const [isImportErrorModalOpen, setIsImportModalOpen] = useState(false);
    const [importErrorData, setImportErrorData] = useState<{
        inconsistentCustomerEmails: string[];
        notOwnerOfOrderCustomerEmails: string[];
    }>({ inconsistentCustomerEmails: [], notOwnerOfOrderCustomerEmails: [] });
    const [importFile, setImportFile] = useState("");

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
                setfilterOptions({
                    weeks: res.data.weeks,
                    billingDates: res.data.billingDates,
                    shippingDates: res.data.shippingDates,
                    customers: res.data.customers,
                });
            }
        };

        getPaymentOrdersList();
        getFilterOptions();
    }, []);

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
    };

    const filterOrders = (paymentOrders) => {
        return !!searchValue
            ? paymentOrders.filter((paymentOrder) => {
                  return (
                      paymentOrder.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
                      paymentOrder.customerEmail.toLowerCase().includes(searchValue.toLowerCase()) ||
                      paymentOrder.humanId?.includes(searchValue.toLowerCase())
                  );
              })
            : paymentOrders;
    };

    const [filteredNextOrders, filteredProcessedOrders, filteredRefusedOrders] = useMemo(
        () => [filterOrders(nextOrdersRows), filterOrders(processedOrdersRows), filterOrders(refusedOrderRows)],
        [searchValue, nextOrdersRows, processedOrdersRows, refusedOrderRows]
    );
    const nextOrders = <OrdersTable rows={filteredNextOrders} />;
    const processedOrders = <OrdersTable rows={filteredProcessedOrders} />;
    const refusedOrder = <OrdersTable rows={filteredRefusedOrders} />;

    const options = ["PRÓXIMAS ORDENES", "ORDENES PROCESADAS", "PAGOS RECHAZADOS"];
    const content = [nextOrders, processedOrders, refusedOrder];

    const handleClickImport = async (e) => {
        const data = new FormData();

        data.append("recipeSelection", e.target.files[0]);
        const res = await importRecipeSelectionForManyOrders(data);

        if (res && res.status === 200) {
            if (res.data.inconsistentCustomerEmails.length > 0 || res.data.notOwnerOfOrderCustomerEmails.length > 0) {
                setImportErrorData(res.data);
                setIsImportModalOpen(true);
            } else {
                enqueueSnackbar("Todas las recetas fueron cargadas correctamente", { variant: "success" });
            }
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado", { variant: "error" });
        }
        setImportFile("");
    };
    const handleClickExport = async (filters: { value: string; label: string }[], selectedFilter: ExportOrdersFilterOptions) => {
        var weeks: string[] = [];
        var shippingDates: string[] = [];
        var billingDates: string[] = [];
        var customers: string[] = [];

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
            case ExportOrdersFilterOptions.CLIENTES:
                customers = filters.map((item) => item.value);
                break;
        }

        const res = await exportOrdersWithRecipesSelection({ weeks, shippingDates, billingDates, customers });

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(!!!res ? "Ha ocurrido un error inesperado" : res.data.message, { variant: "error" });
        }
    };

    return (
        <>
            <DashboardTitleWithCSV
                title="Ordenes"
                import
                importFile={importFile}
                importText="Importar selección de recetas"
                export
                handleClickImport={handleClickImport}
                handleClickExport={() => setisExportModalOpen(true)}
            />
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginY={2}>
                    <SearchInputField handlerOnChange={setSearchValue} placeholder="Buscar por nombre de cliente o correo..." />
                </Box>
            </Grid>

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
                customerOptions={filterOptions.customers}
                title="Exportar pedidos"
            />

            <ImportErrorModal
                handleCancelButton={() => setIsImportModalOpen(false)}
                inconsistentCustomerEmails={importErrorData.inconsistentCustomerEmails}
                notOwnerOfOrderCustomerEmails={importErrorData.notOwnerOfOrderCustomerEmails}
                open={isImportErrorModalOpen}
            />
        </>
    );
};

export default OrdersDashboard;

OrdersDashboard.propTypes = {
    // shippingZones: PropTypes.array.isRequired,
};

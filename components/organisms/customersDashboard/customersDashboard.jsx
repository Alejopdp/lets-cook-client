// Utils & Config
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { exportAllCustomersActions, exportCustomers, getCustomerList } from "../../../helpers/serverRequests/customer";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal components
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import CustomersTable from "./customersTable/customersTable";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import EmptyImage from "../../molecules/emptyImage/emptyImage";
import DashboardTitleWithButtonAndManyCSV from "components/layout/dashboardTitleWithButtonAndManyCSV";
import useLocalStorage from "hooks/useLocalStorage/localStorage";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const CustomersDashboard = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { getFromLocalStorage } = useLocalStorage();
    const { userInfo } = useUserInfoStore();
    const [isValidatingPermission, setIsValidatingPermission] = useState(true);

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.VIEW_CUSTOMER)) router.back();

        setIsValidatingPermission(false);
    }, [userInfo]);

    const canCreate = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.CREATE_CUSTOMER),
        [userInfo]
    );

    const canExportCustomers = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.EXPORT_CUSTOMERS),
        [userInfo]
    );
    const canExportCustomersActions = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.EXPORT_CUSTOMER_ACTIONS),
        [userInfo]
    );

    const exportOptions = useMemo(() => {
        const exportActions = [];

        if (canExportCustomers) exportActions.push({ title: "Exportar clientes", handler: handleClickExport });
        if (canExportCustomersActions) exportActions.push({ title: "Exportar acciones", handler: handleClickExportActions });

        return exportActions;
    }, [canExportCustomers, canExportCustomersActions]);

    const handleClickExport = async () => {
        const res = await exportCustomers();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(!!!res ? "Ha ocurrido un error inesperado" : res.data.message, { variant: "error" });
        }
    };

    const handleClickExportActions = async () => {
        const res = await exportAllCustomersActions();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(!!!res ? "Ha ocurrido un error inesperado" : res.data.message, { variant: "error" });
        }
    };

    const handleCreateCustomer = () => {
        router.push("/gestion-de-clientes/crear");
    };

    useEffect(() => {
        const getCustomers = async () => {
            const res = await getCustomerList(getFromLocalStorage("token"));
            console.log(res);
            if (res.status === 200) {
                setCustomers(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
            setisLoading(false);
        };

        getCustomers();
    }, []);

    const handleDeleteCustomer = async () => {
        if (res.status === 200) {
            setCustomers(customers.filter((customer) => customer.id !== selectedCustomer.id));
            setSelectedCustomer({});
            setIsDeleteModalOpen(false);
            enqueueSnackbar(`Cliente ${selectedCustomer.fullName} ${selectedCustomer.id} eliminado`, {
                variant: "success",
            });
        } else if (res.status === 404) {
            setErrorModalOpen(true);
        } else {
            enqueueSnackbar(`Error al eliminar el cliente ${selectedCustomer.fullName} ${selectedCustomer.id}`, {
                variant: "error",
            });
            setIsDeleteModalOpen(false);
        }
    };

    const handleOpenDeleteModal = (customer) => {
        setSelectedCustomer(customer);
        setIsDeleteModalOpen(true);
    };

    const handleCloseErrorModal = () => {
        setErrorModalOpen(false);
        setIsDeleteModalOpen(false);
    };

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchValue.toLowerCase())
        );
    });

    if (isValidatingPermission) return <></>;
    return (
        <>
            <DashboardTitleWithButtonAndManyCSV
                buttonText="CREAR CLIENTE"
                exports={exportOptions}
                handleClick={handleCreateCustomer}
                title="Clientes"
                import={false}
                handleClickImport={() => ""}
                importFile={undefined}
                showCreateButton={canCreate}
            />

            <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginY={2}>
                    <SearchInputField handlerOnChange={setSearchValue} placeholder="Buscar por nombre o correo..." />
                </Box>
            </Grid>

            {isLoading ? (
                <></> // TO DO: Usar un spinner o skeletons
            ) : filteredCustomers == 0 ? (
                <EmptyImage label="No se han encontrado usuarios que coincidan con los términos de búsqueda" />
            ) : (
                <CustomersTable customers={filteredCustomers} handleDeleteCustomer={handleOpenDeleteModal} />
            )}

            {isDeleteModalOpen && (
                <SimpleModal
                    title="Eliminar cliente"
                    cancelButtonText="Cancelar"
                    confirmButtonText="Eliminar usuario"
                    paragraphs={[`¿Estás seguro de que quieres eliminar al cliente ${selectedCustomer.fullName}?`]}
                    open={isDeleteModalOpen}
                    handleCancelButton={() => setIsDeleteModalOpen(false)}
                    handleConfirmButton={handleDeleteCustomer}
                />
            )}

            {isErrorModalOpen && (
                <SimpleModal
                    title="Eliminar cliente"
                    cancelButtonText="Cancelar"
                    paragraphs={[`No puedes eliminar al cliente ${selectedCustomer.fullName} porque tiene suscripciones activas.`]}
                    open={isDeleteModalOpen}
                    handleCancelButton={handleCloseErrorModal}
                />
            )}
        </>
    );
};

export default CustomersDashboard;

CustomersDashboard.propTypes = {};

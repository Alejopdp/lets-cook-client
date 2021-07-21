// Utils & Config
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getCustomerList, searchCustomers } from "../../../helpers/serverRequests/customer";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal components
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import CustomersTable from "./customersTable/customersTable";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import EmptyImage from "../../molecules/emptyImage/emptyImage";
import DashboardTitleWithButtonAndCSV from "../../layout/dashboardTitleWithButtonAndCSV/dashboardTitleWithButtonAndCSV";

const CustomersDashboard = (props) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleCreateCustomer = () => {
        router.push("/gestion-de-clientes/crear");
    };

    useEffect(() => {
        const getCustomers = async () => {
            const res = await getCustomerList();
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
        return customer.fullName.toLowerCase().includes(searchValue.toLowerCase());
    });

    const handleClickExport = () => alert("Export");

    return (
        <>
            <DashboardTitleWithButtonAndCSV
                title="Clientes"
                export
                handleClickExport={handleClickExport}
                handleClick={handleCreateCustomer}
                buttonText="CREAR CLIENTE"
            />

            <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginY={2}>
                    <SearchInputField handlerOnChange={setSearchValue} placeholder="Buscar por nombre..." />
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

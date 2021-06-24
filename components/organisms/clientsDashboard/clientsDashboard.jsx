// Utils & Config
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import DashboardWithButton from "../../layout/dashboardTitleWithButton/dashboardTitleWithButton";
import SeacrhInputField from "../../molecules/searchInputField/searchInputField";
import ClientsTable from "./clientsTable/clientsTable";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import EmptyImage from "../../molecules/emptyImage/emptyImage";

const ClientsDashboard = (props) => {
    const clientela = [
        {
            id: "1",
            fullName: "Alejo Scotti",
            email: "santiago@letscooknow.es",
            phone: "+34 686 281 378",
            activeSubscriptions: 1,
        },
        {
            id: "2",
            fullName: "Santiago Castiella",
            email: "santiago@letscooknow.es",
            phone: "+34 686 281 378",
            activeSubscriptions: 2,
        },
        {
            id: "3",
            fullName: "Santiago Castiella",
            email: "santiago@letscooknow.es",
            phone: "+34 686 281 378",
            activeSubscriptions: 3,
        },
        {
            id: "4",
            fullName: "Santiago Castiella",
            email: "santiago@letscooknow.es",
            phone: "+34 686 281 378",
            activeSubscriptions: 1,
        },
        {
            id: "5",
            fullName: "Santiago Castiella",
            email: "santiago@letscooknow.es",
            phone: "+34 686 281 378",
            activeSubscriptions: 2,
        },
        {
            id: "6",
            fullName: "Santiago Castiella",
            email: "santiago@letscooknow.es",
            phone: "+34 686 281 378",
            activeSubscriptions: 3,
        },
    ];

    const router = useRouter();

    const [searchValue, setSearchValue] = useState("");
    const [clients, setClients] = useState([...clientela] || []);
    const [selectedClient, setSelectedClient] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleCreateClient = () => {
        router.push("/gestion-de-clientes/crear")
    }

    const handleDeleteClient = () => {
        const res = { status: 200 }

        if (res.status === 200) {
            setClients(clients.filter((client) => client.id !== selectedClient.id));
            setSelectedClient({});
            setIsDeleteModalOpen(false);
            enqueueSnackbar(`Cliente ${selectedClient.fullName} ${selectedClient.id} eliminado`, {
                variant: "success",
            });
        } else {
            enqueueSnackbar(`Error al eliminar el cliente ${selectedClient.fullName} ${selectedClient.id}`, {
                variant: "error",
            });
            setIsDeleteModalOpen(false);
        }
    }

    const handleOpenDeleteModal = (client) => {
        setSelectedClient(client)
        setIsDeleteModalOpen(true)
    }

    const filteredClients = clients.filter((client) => {
        return client.fullName.toLowerCase().includes(searchValue.toLowerCase())
    });

    return (
        <>
        <Container size="md">
            <DashboardWithButton
                title="Clientes"
                buttonText="Crear cliente"
                startIcon
                handleClick={handleCreateClient}
            />

            <SeacrhInputField handlerOnChange={setSearchValue} placeholder="Buscar por nombre..." />

            {filteredClients == 0
                ? <EmptyImage label="No se han encontrado usuarios que coincidan con los términos de búsqueda" />
                : <ClientsTable clients={filteredClients} handleDeleteClient={handleOpenDeleteModal} />
            }
        </Container>

        {isDeleteModalOpen && (
            <SimpleModal
                title="Eliminar cliente"
                cancelButtonText="Cancelar"
                confirmButtonText="Eliminar usuario"
                paragraphs={[
                    `¿Estás seguro de que quieres eliminar al cliente ${selectedClient.fullName}?`
                ]}
                open={isDeleteModalOpen}
                handleCancelButton={() => setIsDeleteModalOpen(false)}
                handleConfirmButton={handleDeleteClient}
            />
        )}
        </>
    );
};

export default ClientsDashboard;

ClientsDashboard.propTypes = {

};

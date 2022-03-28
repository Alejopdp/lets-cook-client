// Utils & Config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { toggleZoneState, deleteZone } from "../../../helpers/serverRequests/shipping";
import { useSnackbar } from "notistack";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal components
import ShippingTable from "./shippingTable";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import EmptyImage from "../../molecules/emptyImage/emptyImage";
import DashboardTitleWithButtonAndCSV from "../../layout/dashboardTitleWithButtonAndCSV/dashboardTitleWithButtonAndCSV";
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const ShippingDashboard = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [shippingZones, setshippingZones] = useState(Array.isArray(props.shippingZones) ? [...props.shippingZones] : []);
    const [selectedShippingZone, setselectedShippingZone] = useState({
        id: "",
        state: "",
        reference: "",
        cost: "",
    });
    const [isStateModalOpen, setisStateModalOpen] = useState(false);
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo } = useUserInfoStore();

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.VIEW_SHIPPING_ZONE)) router.back();

        setIsLoading(false);
    }, [userInfo]);

    const canCreate = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.CREATE_SHIPPING_ZONE),
        [userInfo]
    );

    const handleClick = () => {
        router.push("/gestion-de-envios/crear");
    };

    const handleChangeShippingZoneState = async () => {
        const res = await toggleZoneState(
            selectedShippingZone.id,
            selectedShippingZone.state.toLowerCase() === "active" ? "inactive" : "active"
        );

        if (res.status === 200) {
            enqueueSnackbar(
                `La zona de envío se ${selectedShippingZone.state.toLowerCase() === "active" ? "desactivó" : "activó"} correctamente`,
                { variant: "success" }
            );
            virtuallyUpdateShippingZones();
            setisStateModalOpen(false);
            resetSelectedShippingState();
        } else {
            enqueueSnackbar(`No se pudó modificar la zona de envío`, { variant: "error" });
        }
    };

    const handleOpenStateModal = (shippingZone) => {
        setselectedShippingZone(shippingZone);
        setisStateModalOpen(true);
    };

    const handleCloseStateModal = () => {
        resetSelectedShippingState();
        setisStateModalOpen(false);
    };

    const virtuallyUpdateShippingZones = () => {
        setshippingZones(
            shippingZones.map((zone) => ({
                ...zone,
                state: zone.id === selectedShippingZone.id && selectedShippingZone.state.toLowerCase() === "active" ? "inactive" : "active",
            }))
        );
    };

    const handleOpenDeleteModal = (shippingZone) => {
        setselectedShippingZone(shippingZone);
        setisDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        resetSelectedShippingState();
        setisDeleteModalOpen(false);
    };

    const resetSelectedShippingState = () => {
        setselectedShippingZone({
            id: "",
            state: "",
            reference: "",
            cost: "",
        });
    };

    const handleDeleteShippingZone = async () => {
        const res = await deleteZone(selectedShippingZone.id);

        if (res.status === 200) {
            enqueueSnackbar(`La zona de envío se eliminó correctamente`, { variant: "success" });
            setshippingZones(shippingZones.filter((zone) => zone.id !== selectedShippingZone.id));
            setisDeleteModalOpen(false);
            resetSelectedShippingState();
        } else {
            enqueueSnackbar(`No se pudó modificar la zona de envío`, { variant: "error" });
        }
    };

    const filteredShippingZone = shippingZones.filter((customer) => {
        return customer.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    if (isLoading) return <></>;
    return (
        <>
            <DashboardTitleWithButtonAndCSV
                title="Zonas de envío"
                handleClick={handleClick}
                buttonText="CREAR ZONA DE ENVÍO"
                showCreateButton={canCreate}
            />

            <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginY={2}>
                    <SearchInputField handlerOnChange={setSearchValue} placeholder="Buscar por nombre..." />
                </Box>
            </Grid>

            {filteredShippingZone == 0 ? (
                <EmptyImage label="No se han encontrado zonas de envío que coincidan con los términos de búsqueda" />
            ) : (
                <ShippingTable
                    shippingZones={shippingZones}
                    handleStateClick={handleOpenStateModal}
                    handleDeleteClick={handleOpenDeleteModal}
                />
            )}

            {isStateModalOpen && (
                <SimpleModal
                    cancelButtonText="VOLVER"
                    confirmButtonText={`${selectedShippingZone.state.toLowerCase() === "active" ? "DESACTIVAR" : "ACTIVAR"} ZONA DE ENVÍO`}
                    handleCancelButton={handleCloseStateModal}
                    handleClose={handleCloseStateModal}
                    handleConfirmButton={handleChangeShippingZoneState}
                    open={isStateModalOpen}
                    paragraphs={[
                        `¿Estás seguro de que quieres ${
                            selectedShippingZone.state.toLowerCase() === "active" ? "desactivar" : "activar"
                        } la zona de envío ${selectedShippingZone.reference}?`,
                    ]}
                    title={`${selectedShippingZone.state.toLowerCase() === "active" ? "Desactivar" : "Activar"} zona de envío`}
                />
            )}

            {isDeleteModalOpen && (
                <SimpleModal
                    cancelButtonText="VOLVER"
                    confirmButtonText="ELIMINAR ZONA DE ENVÍO"
                    handleCancelButton={handleCloseDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    handleConfirmButton={handleDeleteShippingZone}
                    open={isDeleteModalOpen}
                    paragraphs={[`¿Estás seguro de que quieres eliminar la zona de envío ${selectedShippingZone.reference}?`]}
                    title={`Eliminar zona de envío`}
                />
            )}
        </>
    );
};

export default ShippingDashboard;

ShippingDashboard.propTypes = {
    shippingZones: PropTypes.array.isRequired,
};

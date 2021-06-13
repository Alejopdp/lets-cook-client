// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import DashboardWithButton from "../../layout/dashboardTitleWithButton/dashboardTitleWithButton";
import ShippingTable from "./shippingTable";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import { toggleZoneState } from "../../../helpers/serverRequests/shipping";
import { useSnackbar } from "notistack";

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
            setselectedShippingZone({});
        } else {
            enqueueSnackbar(`No se pudó modificar la zona de envío`, { variant: "error" });
        }
    };

    const handleOpenStateModal = (shippingZone) => {
        setselectedShippingZone(shippingZone);
        setisStateModalOpen(true);
    };

    const handleCloseStateModal = () => {
        setselectedShippingZone({
            id: "",
            state: "",
            reference: "",
            cost: "",
        });
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

    return (
        <Container size="md">
            <DashboardWithButton title="Zonas de envío" buttonText="Crear zona de envío" startIcon handleClick={handleClick} />
            <ShippingTable shippingZones={shippingZones} handleStateClick={handleOpenStateModal} />

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
        </Container>
    );
};

export default ShippingDashboard;

ShippingDashboard.propTypes = {
    shippingZones: PropTypes.array.isRequired,
};

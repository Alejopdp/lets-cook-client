// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateCustomer } from "../../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import DeliveryAddressModal from "./customerInfoModals/deliveryAddressModal";
import ComplexModal from "../../../molecules/complexModal/complexModal";

const DeliveryAddress = (props) => {
    const [isDeliveryAddressModalOpen, setDeliveryAddressModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        address: props.customer.address || "",
        clarifications: props.customer.clarifications || "",
        preferredSchedule: props.customer.preferredSchedule.value || "",
    });

    console.log(props.customer)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleModifyDeliveryAddress = async () => {
        // const res = await updateCustomer(formDataToUpdate, props.customerId);

        const res = { status: 200 };

        if (res.status === 200) {
            setDeliveryAddressModalOpen(false);
            enqueueSnackbar("Datos de entrega modificados", {
                variant: "success",
            });

            props.handleUpdateDeliveryAddress(formData);
        } else {
            setDeliveryAddressModalOpen(false);
            enqueueSnackbar("No se ha podido modificar la dirección de entrega", {
                variant: "error",
            });
        }
    }

    return (
        <>
        <PaperWithTitleContainer title="Dirección de entrega" height={"479px"} flex>
            <Typography variant="subtitle2">Dirección</Typography>
            <Typography variant="body1" paragraph>{props.customer.address}</Typography>

            <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
            <Typography variant="body1" paragraph>{props.customer.clarifications || "Sin indicar"}</Typography>

            <Typography variant="subtitle2">Horario de preferencia</Typography>
            <Typography variant="body1" paragraph>{props.customer.preferredSchedule.label || "Sin indicar"}</Typography>

            <Typography
                variant="subtitle2"
                color="primary"
                style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                onClick={() => setDeliveryAddressModalOpen(true)}
            >
                Modificar dirección de entrega {" >"}
            </Typography>
        </PaperWithTitleContainer>

        {isDeliveryAddressModalOpen &&
            <ComplexModal
                title="Modificar datos de entrega"
                component={<DeliveryAddressModal formData={formData} handleChange={handleChange} />}
                open={isDeliveryAddressModalOpen}
                cancelButtonText="Cancelar"
                confirmButtonText="Modificar datos de entrega"
                handleCancelButton={() => setDeliveryAddressModalOpen(false)}
                handleConfirmButton={handleModifyDeliveryAddress}
            />
        }
        </>
    );
};

export default DeliveryAddress;

DeliveryAddress.propTypes = {

};

// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateCustomer, updateShippingAddress } from "../../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import DeliveryAddressModal from "./customerInfoModals/deliveryAddressModal";
import ComplexModal from "../../../molecules/complexModal/complexModal";
import { DeliveryAddressProps } from "../interface";
import { getGeometry } from "helpers/geocode/geocode";

const DeliveryAddress = (props: DeliveryAddressProps) => {
    const [isDeliveryAddressModalOpen, setDeliveryAddressModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        name: props.shippingAddress.name || "",
        details: props.shippingAddress.details || "",
        preferredShippingHour: props.shippingAddress.preferredShippingHour || "",
        latitude: props.shippingAddress.latitude,
        longitude: props.shippingAddress.longitude,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleModifyDeliveryAddress = async () => {
        const res = await updateShippingAddress(props.customer.personalData.id, formData);

        if (res.status === 200) {
            props.setCustomer({ ...props.customer, personalData: { ...props.customer.personalData, shippingAddress: { ...formData } } });
            enqueueSnackbar("Datos de entrega modificados", {
                variant: "success",
            });
            setDeliveryAddressModalOpen(false);
        } else {
            enqueueSnackbar(res.data.message, {
                variant: "error",
            });
        }
    };

    const handleGoogleInput = async (address) => {
        const geometry = await getGeometry(address.structured_formatting.main_text);

        setFormData({
            ...formData,
            name: address.description,
            latitude: geometry.lat,
            longitude: geometry.lng,
        });
    };

    return (
        <>
            <PaperWithTitleContainer title="Dirección de entrega" height={"479px"} flex fullWidth>
                <Typography variant="subtitle2">Dirección</Typography>
                <Typography variant="body1" paragraph>
                    {props.shippingAddress.name}
                </Typography>

                <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
                <Typography variant="body1" paragraph>
                    {props.shippingAddress.details || "Sin indicar"}
                </Typography>

                <Typography variant="subtitle2">Horario de preferencia</Typography>
                <Typography variant="body1" paragraph>
                    {props.shippingAddress.preferredShippingHour || "Sin indicar"}
                </Typography>

                <Typography
                    variant="subtitle2"
                    color="primary"
                    style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                    onClick={() => setDeliveryAddressModalOpen(true)}
                >
                    Modificar dirección de entrega
                </Typography>
            </PaperWithTitleContainer>

            {isDeliveryAddressModalOpen && (
                <ComplexModal
                    title="Modificar datos de entrega"
                    component={
                        <DeliveryAddressModal formData={formData} handleGoogleInput={handleGoogleInput} handleChange={handleChange} />
                    }
                    open={isDeliveryAddressModalOpen}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Modificar datos de entrega"
                    handleCancelButton={() => setDeliveryAddressModalOpen(false)}
                    handleConfirmButton={handleModifyDeliveryAddress}
                />
            )}
        </>
    );
};

export default DeliveryAddress;

DeliveryAddress.propTypes = {};

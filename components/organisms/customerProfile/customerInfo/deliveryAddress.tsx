// Utils & Config
import React, { useState, useMemo } from "react";
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
import { translateShippíngHour } from "helpers/i18n/i18n";
import { Permission } from "helpers/types/permission";
import { useUserInfoStore } from "stores/auth";

const DeliveryAddress = (props: DeliveryAddressProps) => {
    const [isDeliveryAddressModalOpen, setDeliveryAddressModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { userInfo } = useUserInfoStore();
    const [formData, setFormData] = useState({
        addressName: props.shippingAddress.addressName || "",
        addressDetails: props.shippingAddress.addressDetails || "",
        preferredShippingHour: props.shippingAddress.preferredShippingHour || "",
        latitude: props.shippingAddress.latitude,
        longitude: props.shippingAddress.longitude,
    });

    const canEdit = useMemo(
        () => Array.isArray(Permission.UPDATE_CUSTOMER) && userInfo.permissions.includes(Permission.UPDATE_CUSTOMER),
        [userInfo]
    );

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
        const geometry = await getGeometry(address.description);

        setFormData({
            ...formData,
            addressName: address.description,
            latitude: geometry.lat,
            longitude: geometry.lng,
        });
    };

    return (
        <>
            <PaperWithTitleContainer title="Dirección de entrega" height={"479px"} flex fullWidth>
                <Typography variant="subtitle2">Dirección</Typography>
                <Typography variant="body1" paragraph>
                    {props.shippingAddress.addressName}
                </Typography>

                <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
                <Typography variant="body1" paragraph>
                    {props.shippingAddress.addressDetails || "Sin indicar"}
                </Typography>

                <Typography variant="subtitle2">Horario de preferencia</Typography>
                <Typography variant="body1" paragraph>
                    {translateShippíngHour(props.shippingAddress.preferredShippingHour) || "Sin indicar"}
                </Typography>

                {canEdit && (
                    <Typography
                        variant="subtitle2"
                        color="primary"
                        style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                        onClick={() => setDeliveryAddressModalOpen(true)}
                    >
                        Modificar dirección de entrega
                    </Typography>
                )}
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
                    isConfirmButtonDisabled={undefined}
                />
            )}
        </>
    );
};

export default DeliveryAddress;

DeliveryAddress.propTypes = {};

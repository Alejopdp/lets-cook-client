// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateBillingData, updateCustomer } from "../../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import { BillingDataProps } from "../interface";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import BillingDataModal from "./customerInfoModals/billingDataModal";
import ComplexModal from "../../../molecules/complexModal/complexModal";
import { getGeometry } from "helpers/geocode/geocode";

const BillingData = (props: BillingDataProps) => {
    const [isBillingDataModalOpen, setBillingDataModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        addressName: props.customer.personalData.billingData?.addressName || "",
        details: props.customer.personalData.billingData?.details || "",
        customerName: props.customer.personalData.billingData?.customerName || "",
        identification: props.customer.personalData.billingData?.identification || "",
        latitude: props.customer.personalData.billingData?.latitude,
        longitude: props.customer.personalData.billingData?.longitude,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleModifyBillingData = async () => {
        const res = await updateBillingData(props.customer.personalData.id, { ...formData });

        if (res.status === 200) {
            props.handleUpdateBillingData(formData);
            setBillingDataModalOpen(false);
            enqueueSnackbar("Datos de facturación modificados", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("No se han podido modificar los datos de facturación", {
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
            <PaperWithTitleContainer title="Datos de facturación" height={"479px"} flex fullWidth>
                <Typography variant="subtitle2">Dirección</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.personalData.billingData?.addressName}
                </Typography>

                <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.personalData.billingData?.details || "Sin indicar"}
                </Typography>

                <Typography variant="subtitle2">Nombre completo</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.personalData.billingData?.customerName}
                </Typography>

                <Typography variant="subtitle2">DNI / NIE / CIF</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.personalData.billingData?.identification || "Sin indicar"}
                </Typography>

                <Typography
                    variant="subtitle2"
                    color="primary"
                    style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                    onClick={() => setBillingDataModalOpen(true)}
                >
                    Modificar datos de facturación
                </Typography>
            </PaperWithTitleContainer>

            {isBillingDataModalOpen && (
                <ComplexModal
                    title="Modificar dirección de facturación"
                    component={<BillingDataModal handleGoogleInput={handleGoogleInput} formData={formData} handleChange={handleChange} />}
                    open={isBillingDataModalOpen}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Modificar dirección de facturación"
                    handleCancelButton={() => setBillingDataModalOpen(false)}
                    handleConfirmButton={handleModifyBillingData}
                />
            )}
        </>
    );
};

export default BillingData;

BillingData.propTypes = {};

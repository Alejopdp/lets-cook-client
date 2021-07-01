// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateCustomer } from "../../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import BillingDataModal from "./customerInfoModals/billingDataModal";
import ComplexModal from "../../../molecules/complexModal/complexModal";

const BillingData = (props) => {
    const [isBillingDataModalOpen, setBillingDataModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [formData, setFormData] = useState({
        address: props.customer.address || "",
        clarifications: props.customer.clarifications || "",
        name: props.customer.name || "",
        personalIdNumber: props.customer.personalIdNumber || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleModifyBillingData = async () => {
        // const res = await updateCustomer(formDataToUpdate, props.customer.id);

        const res = { status: 200 };

        if (res.status === 200) {
            setBillingDataModalOpen(false);
            enqueueSnackbar("Datos de facturación modificados", {
                variant: "success",
            });

            props.handleUpdateBillingData(formData);
        } else {
            setDeliveryAddressModalOpen(false);
            enqueueSnackbar("No se han podido modificar los datos de facturación", {
                variant: "error",
            });
        }
    }

    return (
        <>
        <PaperWithTitleContainer title="Datos de facturación" height={"418px"} flex>
            <Typography variant="subtitle2">Dirección</Typography>
            <Typography variant="body1" paragraph>{props.customer.address}</Typography>

            <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
            <Typography variant="body1" paragraph>{props.customer.clarifications || "Sin indicar"}</Typography>

            <Typography variant="subtitle2">Nombre completo</Typography>
            <Typography variant="body1" paragraph>{props.customer.name}</Typography>

            <Typography variant="subtitle2">DNI / NIE / CIF</Typography>
            <Typography variant="body1" paragraph>{props.customer.personalIdNumber}</Typography>

            <Typography
                variant="subtitle2"
                color="primary"
                style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto"}}
                onClick={() => setBillingDataModalOpen(true)}
            >
                Modificar datos de facturación {" >"}
            </Typography>
        </PaperWithTitleContainer>

        {isBillingDataModalOpen &&
            <ComplexModal
                title="Modificar dirección de facturación"
                component={<BillingDataModal formData={formData} handleChange={handleChange} />}
                open={isBillingDataModalOpen}
                cancelButtonText="Cancelar"
                confirmButtonText="Modificar dirección de facturación"
                handleCancelButton={() => setBillingDataModalOpen(false)}
                handleConfirmButton={handleModifyBillingData}
            />
        }
        </>
    );
};

export default BillingData;

BillingData.propTypes = {

};

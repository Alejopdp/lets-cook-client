// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
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

    const handleModifyBillingData = () => {
        const res = { status: 200 };

        if (res.status === 200) {
            setBillingDataModalOpen(false);
            enqueueSnackbar("Datos de facturación modificados", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("No se han podido modificar los datos de facturación", {
                variant: "error",
            });
            setDeliveryAddressModalOpen(false);
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
                component={<BillingDataModal customer={props.customer} />}
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

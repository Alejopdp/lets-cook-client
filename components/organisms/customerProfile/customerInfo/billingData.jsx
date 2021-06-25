// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";

const BillingData = (props) => {
    return (
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
                onClick={() => alert("Modificar datos de facturación")}
            >
                Modificar datos de facturación {" >"}
            </Typography>

        </PaperWithTitleContainer>
    );
};

export default BillingData;

BillingData.propTypes = {

};

// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";

const DeliveryAddress = (props) => {
    return (
        <PaperWithTitleContainer title="Dirección de entrega" height={"418px"}>
            <Typography variant="subtitle2">Dirección</Typography>
            <Typography variant="body1" paragraph>{props.client.deliveryAddress}</Typography>

            <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
            <Typography variant="body1" paragraph>{props.deliveryClarifications || "Sin indicar"}</Typography>

            <Typography variant="subtitle2">Horario de preferencia</Typography>
            <Typography variant="body1" paragraph>{props.client.deliveryPreferredSchedule || "Sin indicar"}</Typography>

            <Typography
                variant="subtitle2"
                color="primary"
                style={{ textTransform: "uppercase", cursor: "pointer" }}
                onClick={() => alert("Modificar dirección de entrega")}
            >
                Modificar dirección de entrega {" >"}
            </Typography>

        </PaperWithTitleContainer>
    );
};

export default DeliveryAddress;

DeliveryAddress.propTypes = {

};

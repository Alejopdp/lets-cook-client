// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";

const PersonalData = (props) => {
    return (
        <PaperWithTitleContainer title="Datos personales">
            <Typography variant="subtitle2">Nombre completo</Typography>
            <Typography variant="body1" paragraph>{props.client.name} {props.client.lastName}</Typography>

            <Typography variant="subtitle2">Teléfono (1)</Typography>
            <Typography variant="body1" paragraph>{props.client.phone1}</Typography>

            <Typography variant="subtitle2">Teléfono (2)</Typography>
            <Typography variant="body1" paragraph>{props.client.phone2 || "Sin indicar"}</Typography>

            <Typography variant="subtitle2">Fecha de nacimiento</Typography>
            <Typography variant="body1" paragraph>{props.client.bornDate || "Sin indicar"}</Typography>

            <Typography variant="subtitle2">Idioma de preferencia</Typography>
            <Typography variant="body1" paragraph>{props.client.preferredLanguage}</Typography>

            <Typography
                variant="subtitle2"
                color="primary"
                style={{ textTransform: "uppercase", cursor: "pointer"}}
                onClick={() => alert("Modificar datos personales")}
            >
                Modificar datos personales {" >"}
            </Typography>

        </PaperWithTitleContainer>
    );
};

export default PersonalData;

PersonalData.propTypes = {

};

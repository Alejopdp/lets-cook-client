// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import ComplexModal from "../../../molecules/complexModal/complexModal";
import PersonalDataModal from "./customerInfoModals/personalDataModal";

const PersonalData = (props) => {
    const [isPersonalDataModalOpen, setPersonalDataModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleModifyPersonalData = () => {
        const res = { status: 200 }

        if (res.status === 200) {
            setPersonalDataModalOpen(false)
            enqueueSnackbar(`Cliente ${props.customer.name} ${props.customer.lastName} modificado`, {
                variant: "success",
            });
        } else {
            enqueueSnackbar(`Error al modificar el cliente ${props.customer.name} ${props.customer.lastName}`, {
                variant: "error",
            });
            setPersonalDataModalOpen(false);
        }
    }

    return (
        <>
        <PaperWithTitleContainer title="Datos personales">
            <Typography variant="subtitle2">Nombre completo</Typography>
            <Typography variant="body1" paragraph>{props.customer.name} {props.customer.lastName}</Typography>

            <Typography variant="subtitle2">Teléfono (1)</Typography>
            <Typography variant="body1" paragraph>{props.customer.phone1}</Typography>

            <Typography variant="subtitle2">Teléfono (2)</Typography>
            <Typography variant="body1" paragraph>{props.customer.phone2 || "Sin indicar"}</Typography>

            <Typography variant="subtitle2">Fecha de nacimiento</Typography>
            <Typography variant="body1" paragraph>{props.customer.bornDate || "Sin indicar"}</Typography>

            <Typography variant="subtitle2">Idioma de preferencia</Typography>
            <Typography variant="body1" paragraph>{props.customer.preferredLanguage}</Typography>

            <Typography
                variant="subtitle2"
                color="primary"
                style={{ textTransform: "uppercase", cursor: "pointer"}}
                onClick={() => setPersonalDataModalOpen(true)}
            >
                Modificar datos personales {" >"}
            </Typography>

        </PaperWithTitleContainer>

        {isPersonalDataModalOpen &&
            <ComplexModal
                title="Modificar datos personales"
                component={<PersonalDataModal customer={props.customer} />}
                open={isPersonalDataModalOpen}
                cancelButtonText="Cancelar"
                confirmButtonText="Modificar datos personales"
                handleCancelButton={() => setPersonalDataModalOpen(false)}
                handleConfirmButton={handleModifyPersonalData}
            />

        }
        </>
    );
};

export default PersonalData;

PersonalData.propTypes = {

};

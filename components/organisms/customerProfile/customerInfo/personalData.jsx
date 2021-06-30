// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateCustomer } from "../../../../helpers/serverRequests/customer";
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

    const [formData, setFormData] = useState({
        name: props.customer.name || "",
        lastName: props.customer.lastName || "",
        email: props.customer.email || "",
        phone1: props.customer.phone1 || "",
        phone2: props.customer.phone2 || "",
        bornDate: props.customer.bornDate || "",
        preferredLanguage: props.customer.preferredLanguage || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleModifyPersonalData = async () => {
        // const formDataToUpdate = new FormData();

        // formDataToUpdate.append("name", formData.name);
        // formDataToUpdate.append("lastName", formData.lastName);
        // formDataToUpdate.append("email", formData.email);
        // formDataToUpdate.append("phone1", formData.phone1);
        // formDataToUpdate.append("phone2", formData.phone2);
        // formDataToUpdate.append("bornDate", formData.bornDate);
        // formDataToUpdate.append("preferredLanguage", formData.preferredLanguage);

        // const res = await updateCustomer(formDataToUpdate, props.customer.id);

        const res = { status: 200 };

        if (res.status === 200) {
            setPersonalDataModalOpen(false);
            enqueueSnackbar(`Cliente ${props.customer.name} ${props.customer.lastName} modificado`, {
                variant: "success",
            });

            props.handlePersonalDataSubmit(formData.name);
        } else {
            setPersonalDataModalOpen(false);
            enqueueSnackbar(`Error al modificar el cliente ${props.customer.name} ${props.customer.lastName}`, {
                variant: "error",
            });
        }
    };

    return (
        <>
            <PaperWithTitleContainer title="Datos personales">
                <Typography variant="subtitle2">Nombre completo</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.name} {props.customer.lastName}
                </Typography>

                <Typography variant="subtitle2">Teléfono (1)</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.phone1}
                </Typography>

                <Typography variant="subtitle2">Teléfono (2)</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.phone2 || "Sin indicar"}
                </Typography>

                <Typography variant="subtitle2">Fecha de nacimiento</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.bornDate || "Sin indicar"}
                </Typography>

                <Typography variant="subtitle2">Idioma de preferencia</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.preferredLanguage}
                </Typography>

                <Typography variant="subtitle2">Email</Typography>
                <Typography variant="body1" paragraph>
                    {props.customer.email}
                </Typography>

                <Typography
                    variant="subtitle2"
                    color="primary"
                    style={{ textTransform: "uppercase", cursor: "pointer" }}
                    onClick={() => setPersonalDataModalOpen(true)}
                >
                    Modificar datos personales {" >"}
                </Typography>
            </PaperWithTitleContainer>

            {isPersonalDataModalOpen && (
                <ComplexModal
                    title="Modificar datos personales"
                    component={<PersonalDataModal formData={formData} handleChange={handleChange} />}
                    open={isPersonalDataModalOpen}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Modificar datos personales"
                    handleCancelButton={() => setPersonalDataModalOpen(false)}
                    handleConfirmButton={handleModifyPersonalData}
                />
            )}
        </>
    );
};

export default PersonalData;

PersonalData.propTypes = {};

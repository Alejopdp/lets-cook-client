// Utils & Config
import React, { useState, useMemo } from "react";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import ComplexModal from "../../../molecules/complexModal/complexModal";
import PersonalDataModal from "./customerInfoModals/personalDataModal";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const PersonalData = (props) => {
    const [isPersonalDataModalOpen, setPersonalDataModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: props.personalData.name || "",
        lastName: props.personalData.lastName || "",
        email: props.personalData.email || "",
        phone1: props.personalData.phone1 || "",
        phone2: props.personalData.phone2 || "",
        bornDate: props.personalData.bornDate || "",
        preferredLanguage: props.personalData.preferredLanguage || "",
    });
    const { userInfo } = useUserInfoStore();

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

    const handleModifyPersonalData = async () => {
        props.handleUpdatePersonalData(formData);
    };

    return (
        <>
            <PaperWithTitleContainer title="Datos personales" fullWidth>
                <Typography variant="subtitle2">Nombre completo</Typography>
                <Typography variant="body1" paragraph>
                    {props.personalData.name} {props.personalData.lastName}
                </Typography>
                <Typography variant="subtitle2">Teléfono (1)</Typography>
                <Typography variant="body1" paragraph>
                    {props.personalData.phone1}
                </Typography>
                <Typography variant="subtitle2">Teléfono (2)</Typography>
                <Typography variant="body1" paragraph>
                    {props.personalData.phone2 || "Sin indicar"}
                </Typography>
                <Typography variant="subtitle2">Fecha de nacimiento</Typography>
                <Typography variant="body1" paragraph>
                    {props.personalData.bornDate || "Sin indicar"}
                </Typography>
                <Typography variant="subtitle2">Idioma de preferencia</Typography>
                <Typography variant="body1" paragraph>
                    {props.personalData.preferredLanguage}
                </Typography>
                <Typography variant="subtitle2">Email</Typography>
                <Typography variant="body1" paragraph>
                    {props.personalData.email}
                </Typography>
                {canEdit && (
                    <Typography
                        variant="subtitle2"
                        color="primary"
                        style={{ textTransform: "uppercase", cursor: "pointer" }}
                        onClick={() => setPersonalDataModalOpen(true)}
                    >
                        Modificar datos personales
                    </Typography>
                )}{" "}
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

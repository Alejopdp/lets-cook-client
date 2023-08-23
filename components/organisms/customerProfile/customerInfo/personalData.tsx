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
import { Customer } from "helpers/types/customer";

export type FormData = {
    name: string;
    lastName: string;
    email: string;
    phone1: string;
    phone2: string;
    bornDate: string;
    preferredLanguage: string;
};
type PersonalDataProps = {
    customer: Customer;
    handleUpdatePersonalData: (formData: FormData) => Promise<void>;
};

const PersonalData = (props: PersonalDataProps) => {
    const [isPersonalDataModalOpen, setPersonalDataModalOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: props.customer.name || "",
        lastName: props.customer.lastName || "",
        email: props.customer.email || "",
        phone1: props.customer.phone1 || "",
        phone2: props.customer.phone2 || "",
        bornDate: props.customer.bornDate || "",
        preferredLanguage: props.customer.preferredLanguage || "",
    });
    const { userInfo } = useUserInfoStore();

    const canEdit = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.UPDATE_CUSTOMER),
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
                    handleClose={() => setPersonalDataModalOpen(false)}
                    isConfirmButtonDisabled={false}
                />
            )}
        </>
    );
};

export default PersonalData;

// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";

// Internal components
import Input from "../../../../atoms/input/input";
import SelectInput from "../../../../atoms/selectInput/SelectInput";
import { FormData } from "../personalData";

type PersonalDataModalProps = {
    formData: FormData;
    handleChange: (e) => void;
};

const PersonalDataModal = (props: PersonalDataModalProps) => {
    const languages = [
        {
            value: "EN",
            label: "Inglés",
        },
        {
            value: "ES",
            label: "Español",
        },
        {
            value: "CA",
            label: "Catalán",
        },
    ];

    return (
        <>
            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input name="name" label="Nombre" value={props.formData.name} handleChange={props.handleChange} />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input name="lastName" label="Apellido/s" value={props.formData.lastName} handleChange={props.handleChange} />
                </Box>
            </Box>

            <Input name="email" label="Email" value={props.formData.email} handleChange={props.handleChange} />

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input name="phone1" label="Teléfono (1)" value={props.formData.phone1} handleChange={props.handleChange} />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input name="phone2" label="Teléfono (2)" value={props.formData.phone2} handleChange={props.handleChange} />
                </Box>
            </Box>

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input name="date" type="date" label={null} value={props.formData.bornDate} handleChange={props.handleChange} />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <SelectInput
                        name="preferredLanguage"
                        label="Idioma de preferencia"
                        value={props.formData.preferredLanguage}
                        handleChange={props.handleChange}
                        options={languages}
                    />
                </Box>
            </Box>
        </>
    );
};

export default PersonalDataModal;

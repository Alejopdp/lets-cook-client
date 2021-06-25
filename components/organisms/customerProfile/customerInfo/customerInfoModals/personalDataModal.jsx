// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";

// Internal components
import Input from "../../../../atoms/input/input";
import SelectInput from "../../../../atoms/selectInput/SelectInput";

const PersonalDataModal = (props) => {
    const [formData, setFormData] = useState({
        name: props.customer.name || "",
        lastName: props.customer.lastName || "",
        email: props.customer.email || "",
        phone1: props.customer.phone1 || "",
        phone2: props.customer.phone2 || "",
        bornDate: props.customer.bornDate || "",
        preferredLanguage: props.customer.preferredLanguage || "",
    })

    const languages = [
        {
            value: 'EN',
            label: 'Inglés',
        },
        {
            value: 'ES',
            label: 'Español',
        },
        {
            value: 'CA',
            label: 'Catalán',
        },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <>
            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input
                        name="name"
                        label="Nombre"
                        value={formData.name}
                        handleChange={handleChange}
                    />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input
                        name="lastName"
                        label="Apellido/s"
                        value={formData.lastName}
                        handleChange={handleChange}
                    />
                </Box>
            </Box>

            <Input
                name="email"
                label="Email"
                value={formData.email}
                handleChange={handleChange}
            />

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input
                        name="phone1"
                        label="Teléfono (1)"
                        value={formData.phone1}
                        handleChange={handleChange}
                    />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input
                        name="phone2"
                        label="Teléfono (2)"
                        value={formData.phone2}
                        handleChange={handleChange}
                    />
                </Box>
            </Box>

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input
                        name="date"
                        type="date"
                        label={null}
                        value={formData.bornDate}
                        handleChange={handleChange}
                    />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <SelectInput
                        name="preferredLanguage"
                        label="Idioma de preferencia"
                        value={formData.preferredLanguage}
                        handleChange={handleChange}
                        options={languages}
                    />
                </Box>
            </Box>
        </>
    );
};

export default PersonalDataModal;

PersonalDataModal.propTypes = {

};

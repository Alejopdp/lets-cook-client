// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External components
import Box from "@material-ui/core/Box";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

// Internal components
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Input from "../../atoms/input/input";
// import DatePicker from "../../atoms/datepicker";
import SelectInput from "../../atoms/selectInput/SelectInput";

const PersonalData = (props) => {
    const theme = useTheme();

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
        <PaperWithTitleContainer width="70%" title="Datos personales" marginBottom="16px">
            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input
                        name="name"
                        label="Nombre"
                        value={props.formData.name}
                        handleChange={props.handleChange} />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input
                        name="lastName"
                        label="Apellido/s"
                        value={props.formData.lastName}
                        handleChange={props.handleChange} />
                </Box>
            </Box>

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input
                        name="phone1"
                        label="Teléfono (1)"
                        value={props.formData.phone1}
                        handleChange={props.handleChange} />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input
                        name="phone2"
                        label="Teléfono (2)"
                        value={props.formData.phone2}
                        handleChange={props.handleChange} />
                </Box>
            </Box>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableFuture
                        variant="inline"
                        inputVariant="outlined"
                        label="Fecha de nacimiento"
                        fullWidth
                        openTo="year"
                        autoOk
                        format="dd/MM/yyyy"
                        value={props.formData.bornDate}
                        onChange={(date) => props.handleChange({ target: { name: "bornDate", value: date.toString() } })}
                    />
            </MuiPickersUtilsProvider>

            <Box width="100%" marginTop="16px">
                <SelectInput
                    name="preferredLanguage"
                    label="Idioma de preferencia"
                    value={props.formData.preferredLanguage}
                    handleChange={props.handleChange}
                    options={languages}
                />
            </Box>
        </PaperWithTitleContainer>
    );
};

export default PersonalData;

PersonalData.propTypes = {};

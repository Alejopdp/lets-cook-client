// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External components
import Box from "@material-ui/core/Box";

// Internal components
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Input from "../../atoms/input/input";
import DatePicker from "../../atoms/datepicker";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SelectInput from "../../atoms/selectInput/SelectInput";

const useStyles = makeStyles((theme) => ({
    root: {
        "& div.MuiPickersBasePicker-pickerView": {
            alignSelf: "center",
        },
        "& div.MuiPickersDatePickerRoot-toolbar": {
            display: "none",
        },
        marginBottom: theme.spacing(2),
    },
}));

const PersonalData = (props) => {
    const classes = useStyles();
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

    const [selectedDate, setSelectedDate] = useState(new Date());

    console.log('selectedDate', selectedDate)
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    return (
        <PaperWithTitleContainer width="70%" title="Datos personales">
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
                        value={props.phone1}
                        handleChange={props.handleChange} />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input
                        name="phone2"
                        label="Teléfono (2)"
                        value={props.phone2}
                        handleChange={props.handleChange} />
                </Box>
            </Box>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.root}>
                    <DatePicker
                        disableFuture
                        autoOk
                        variant="static"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        value={selectedDate}
                        handleDateChange={handleDateChange}
                    />
                </div>
            </MuiPickersUtilsProvider>

            <Box width="100%">
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

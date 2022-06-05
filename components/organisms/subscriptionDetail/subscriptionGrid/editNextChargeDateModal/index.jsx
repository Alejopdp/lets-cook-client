// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../../../atoms/modal/modal";
import DataDisplay from "../../../../molecules/dataDisplay/dataDisplay";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        "& div.MuiPickersBasePicker-pickerView": {
            alignSelf: "center",
        },
        "& div.MuiPickersDatePickerRoot-toolbar": {
            display: "none",
        },
    },
}));

const EditNextChargeDateModal = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
    };

    function filterDays(date) {
        // Return false if Saturday or Sunday
        return (
            date.getDay() === 0 ||
            date.getDay() === 1 ||
            date.getDay() === 2 ||
            date.getDay() === 3 ||
            date.getDay() === 4 ||
            date.getDay() === 5 ||
            date.getTime() <= new Date().getTime()
        );
    }

    const handleSubmitFrequency = () => {
        props.handlePrimaryButtonClick(selectedDate);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={handleSubmitFrequency}
            title="Modificar fecha del próximo cobro"
            primaryButtonText="Modificar fecha"
            secondaryButtonText="cerrar"
            fullScreen
        >
            <DataDisplay
                title="Fecha del próximo cargo actual"
                text={props.actualNextBillingDate}
                style={{ marginBottom: theme.spacing(3) }}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className={classes.root}>
                    <DatePicker
                        disablePast
                        autoOk
                        variant="static"
                        openTo="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        shouldDisableDate={filterDays}
                    />
                </div>
            </MuiPickersUtilsProvider>
        </Modal>
    );
};

export default EditNextChargeDateModal;

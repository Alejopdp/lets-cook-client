import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { useState } from "react";

const DatePicker = ({ dateSelected = new Date(), label, handleDateChange = () => {} }) => {
    const [selectedDate, setSelectedDate] = useState(new Date(dateSelected));

    const _handleDateChange = (date) => {
        setSelectedDate(date);
        handleDateChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                fullWidth
                label={label}
                value={selectedDate}
                onChange={_handleDateChange}
            />
        </MuiPickersUtilsProvider>
    );
};

DatePicker.propTypes = {
    dateSelected: PropTypes.any,
    label: PropTypes.string,
    handleDateChange: PropTypes.func,
};

DatePicker.defaultValues = {
    dateSelected: new Date(),
    handleDateChange: () => {},
};

export default DatePicker;

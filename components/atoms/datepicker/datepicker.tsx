import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { useState } from "react";

interface DatePickerProps {
    dateSelected: Date;
    label: string;
    handleDateChange: (date: Date) => void;
    disableFuture?: boolean;
}

const DatePicker = ({ dateSelected = new Date(), label = "", handleDateChange = () => {}, disableFuture }: DatePickerProps) => {
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
                disableFuture={disableFuture}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;

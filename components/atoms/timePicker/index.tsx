import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

type WrappedTimePickerProps = {
    label: string;
    value: any;
    onChange: (newValue: any) => void;
};

export default function WrappedTimePicker(props: WrappedTimePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopTimePicker
                label={props.label}
                value={props.value}
                onChange={(newValue) => props.onChange(newValue)}
                format="HH:mm"
                maxTime={new Date(0, 0, 0, 23, 0, 0)}
                ampm={false}
                ampmInClock={false}
            />
        </LocalizationProvider>
    );
}

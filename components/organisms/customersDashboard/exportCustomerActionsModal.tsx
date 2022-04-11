import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import Datepicker from "components/atoms/datepicker";

interface ExportModalProps {
    title: string;
    cancelButtonText: string;
    confirmButtonText: string;
    handleConfirmButton: (startDate: Date, endDate: Date) => void;
    handleCancelButton: () => void;
    isOpen: boolean;
    handleClose: () => void;
    isSubmitting: boolean;
}

const ExportModal = ({
    title,
    cancelButtonText,
    confirmButtonText,
    handleConfirmButton = (startDate: Date, endDate: Date) => {},
    handleCancelButton = () => {},
    isOpen: open,
    handleClose = () => {},
    isSubmitting,
}: ExportModalProps) => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    return (
        <Dialog open={open} onClose={handleClose} style={{ minWidth: 342, minHeight: "calc(100% - 64px)" }} maxWidth={false}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormGroup row>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Datepicker
                                dateSelected={startDate}
                                label={"Fecha inicio"}
                                handleDateChange={(date: Date) => setStartDate(date)}
                                disableFuture
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Datepicker
                                dateSelected={endDate}
                                label={"Fecha fin"}
                                handleDateChange={(date: Date) => setEndDate(date)}
                                disableFuture
                            />
                        </Grid>
                    </Grid>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={() => handleConfirmButton(startDate, endDate)} color="primary" disabled={isSubmitting}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportModal;

import React from 'react'
import { useState, } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";
import DatePicker from 'components/atoms/datepicker/datepicker';

interface ExportModalProps {
    handleConfirmButton: (shippingDate: Date | undefined) => void;
    handleCancelButton: () => void;
    open: boolean;
    handleClose: () => void;
    isSubmitting: boolean;
}


function ExportModal ({ handleCancelButton, handleClose, handleConfirmButton, isSubmitting, open}: ExportModalProps) {
    const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

    return (
        <Dialog open={open} onClose={handleClose} style={{ minWidth: 342, minHeight: "calc(100% - 64px)" }} maxWidth={false}>
            <DialogTitle>{"Exportar valoraciones"}</DialogTitle>
            <DialogContent>
            <DatePicker dateSelected={dateValue} label={"Entregado a partir de"} handleDateChange={setDateValue} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    Cancelar
                </Button>
                <Button onClick={() => handleConfirmButton(dateValue)} color="primary" disabled={isSubmitting}>
                    Exportar valoraciones
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ExportModal
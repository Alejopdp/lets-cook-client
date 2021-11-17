import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";

interface ImportErrorModalProps {
    inconsistentCustomerEmails: string[];
    notOwnerOfOrderCustomerEmails: string[];
    open: boolean;
    handleCancelButton: () => void;
}

const ImportErrorModal = ({
    inconsistentCustomerEmails = [],
    notOwnerOfOrderCustomerEmails = [],
    open,
    handleCancelButton,
}: ImportErrorModalProps) => {
    return (
        <Dialog open={open} onClose={handleCancelButton}>
            <DialogTitle>Clientes con error</DialogTitle>
            <DialogContent>
                {inconsistentCustomerEmails.length > 0 && (
                    <Box marginBottom={2}>
                        <Typography style={{ fontWeight: 700 }}>Clientes con 2 emails distintos para un mismo ID de pedido</Typography>
                        {inconsistentCustomerEmails.map((mail) => (
                            <Typography>{mail}</Typography>
                        ))}
                    </Box>
                )}
                {notOwnerOfOrderCustomerEmails.length > 0 && (
                    <>
                        <Typography style={{ fontWeight: 700 }}>Clientes con ID de pedido incorrecto</Typography>
                        {notOwnerOfOrderCustomerEmails.map((mail) => (
                            <Typography>{mail}</Typography>
                        ))}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton}>VOLVER</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportErrorModal;

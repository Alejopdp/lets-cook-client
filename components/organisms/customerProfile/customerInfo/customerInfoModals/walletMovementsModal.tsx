import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { WalletMovement } from "helpers/types/customer";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { format } from "date-fns";

type WalletMovementsModalProps = {
    movements: WalletMovement[];
    isOpen: boolean;
    handleClose: () => void;
};

const WalletMovementsModal = (props: WalletMovementsModalProps) => {
    return (
        <Dialog open={props.isOpen} onClose={props.handleClose} fullWidth>
            <DialogTitle>Movimientos del Monedero</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column">
                    {props.movements.map((movement) => {
                        const formattedDate = format(new Date(movement.createdAt), "dd/MM/yyyy HH:mm:ss");
                        return (
                            <Box display="flex" flexDirection="row" justifyContent={"space-between"} marginBottom={2}>
                                <Typography variant="body2" color="initial">
                                    {movement.title}
                                </Typography>
                                <Typography variant="body2" color="initial">
                                    {formattedDate}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default WalletMovementsModal;

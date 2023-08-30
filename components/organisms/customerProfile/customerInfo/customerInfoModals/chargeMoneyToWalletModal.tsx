// Utils & Config
import React from "react";
// External components
import Box from "@material-ui/core/Box";

// Internal components
import Input from "../../../../atoms/input/input";

type ChargeMoneyToWalletModalProps = {
    amountToCharge: number;
    setAmountToCharge: (amountToCharge: number) => void;
};

const ChargeMoneyToWalletModal = (props: ChargeMoneyToWalletModalProps) => {
    return (
        <>
            <Box display="flex" flexDirection="row">
                <Input
                    name="amountToCharge"
                    label="Monto a cargar"
                    type="number"
                    value={props.amountToCharge === 0 ? "" : props.amountToCharge ?? ""}
                    handleChange={(e) => {
                        props.setAmountToCharge(e.target.value);
                    }}
                />
            </Box>
        </>
    );
};

export default ChargeMoneyToWalletModal;

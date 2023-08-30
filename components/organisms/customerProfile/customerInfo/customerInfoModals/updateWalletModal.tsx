// Utils & Config
import React from "react";
// External components
import Box from "@material-ui/core/Box";

// Internal components
import Input from "../../../../atoms/input/input";
import SelectInput from "../../../../atoms/selectInput/SelectInput";
import { PaymentMethod, Wallet } from "helpers/types/customer";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import CheckboxList from "components/atoms/checkboxList/checkboxList";
import WrappedTimePicker from "components/atoms/timePicker";
import { DayItem } from "../customerWallet";

type UpdateWalletModalProps = {
    wallet: Wallet | undefined;
    setWallet: (wallet: Wallet) => void;
    customerPaymentMethods: PaymentMethod[];
    days: DayItem[];
    setDays: (days: DayItem[]) => void;
    hour: number | null;
    setHour: (hour: number | null) => void;
    paymentMethod: PaymentMethod | undefined;
    setPaymentMethod: (paymentMethod: PaymentMethod | undefined) => void;
};

const UpdateWalletModal = (props: UpdateWalletModalProps) => {
    return (
        <>
            <Box display="flex" flexDirection="row">
                <Input
                    name="amountToCharge"
                    label="Monto a cargar"
                    type="number"
                    value={props.wallet?.amountToCharge ?? ""}
                    handleChange={(e) => {
                        props.setWallet({ ...props.wallet, amountToCharge: e.target.value });
                    }}
                />
            </Box>
            <Box display="flex" flexDirection="row">
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={() => props.setWallet({ ...props.wallet, isEnabled: !props.wallet.isEnabled })}
                            name="isEnabled"
                            value={props.wallet?.isEnabled ?? false}
                            checked={props.wallet?.isEnabled ?? false}
                            color="primary"
                        />
                    }
                    label="Quiero que sea una recarga periódica"
                />
            </Box>

            <Box display={"flex"} marginY={1} visibility={props.wallet?.isEnabled ? "visible" : "hidden"}>
                <CheckboxList
                    items={props.days}
                    handleOnChange={function (item: DayItem): void {
                        const newDays = [...props.days];
                        newDays.forEach((day: DayItem) => {
                            if (day.value === item.value) {
                                day.checked = !day.checked;
                            }
                        });

                        props.setDays([...newDays]);
                    }}
                />
            </Box>

            <Box display="flex" flexDirection="row" marginBottom={2} visibility={props.wallet?.isEnabled ? "visible" : "hidden"}>
                <WrappedTimePicker label="Hora" value={props.hour} onChange={props.setHour} />
            </Box>

            <Box display="flex" flexDirection="row">
                <Box width={"100%"}>
                    <SelectInput
                        name="paymentMethod"
                        label="Método de cobro"
                        value={props.paymentMethod?.id ?? ""}
                        handleChange={(event) => {
                            props.setPaymentMethod(props.customerPaymentMethods.find((pm) => pm.id === event.target.value));
                        }}
                        options={props.customerPaymentMethods.map((pm) => ({ label: pm.card, value: pm.id }))}
                    />
                </Box>
            </Box>
        </>
    );
};

export default UpdateWalletModal;

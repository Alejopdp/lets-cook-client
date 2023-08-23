import React, { useEffect, useState } from "react";
import PaperWithTitleContainer from "components/molecules/paperWithTitleContainer/paperWithTitleContainer";
import { Box, Typography } from "@material-ui/core";
import { PaymentMethod, Wallet } from "helpers/types/customer";
import ComplexModal from "components/molecules/complexModal/complexModal";
import CreateWalletModal from "./customerInfoModals/createWalletModal";
import UpdateWalletModal from "./customerInfoModals/updateWalletModal";
import ChargeMoneyToWalletModal from "./customerInfoModals/chargeMoneyToWalletModal";

type CustomerWalletProps = {
    wallet: Wallet | undefined;
    customerPaymentMethods: PaymentMethod[];
    handleCreateWallet: (wallet: Wallet) => Promise<boolean>;
    handleUpdateWallet: (wallet: Wallet) => Promise<boolean>;
    handleChargeMoney: (amountToCharge: number) => Promise<boolean>;
};

export type DayItem = {
    label: string;
    value: number;
    checked: boolean;
    name: string;
    subtitle: string | undefined;
    children: any | undefined;
};

const dayItems = [
    { label: "Lunes", value: 1, checked: false, name: "Lunes", subtitle: undefined, children: undefined },
    { label: "Martes", value: 2, checked: false, name: "Martes", subtitle: undefined, children: undefined },
    { label: "Miércoles", value: 3, checked: false, name: "Miércoles", subtitle: undefined, children: undefined },
    { label: "Jueves", value: 4, checked: false, name: "Jueves", subtitle: undefined, children: undefined },
    { label: "Viernes", value: 5, checked: false, name: "Viernes", subtitle: undefined, children: undefined },
    { label: "Sábado", value: 6, checked: false, name: "Sábado", subtitle: undefined, children: undefined },
    { label: "Domingo", value: 0, checked: false, name: "Domingo", subtitle: undefined, children: undefined },
];

const CustomerWallet = (props: CustomerWalletProps) => {
    const [isCreateWalletModalOpened, setIsCreateModalOpened] = useState(false);
    const [isUpdateWalletModalOpened, setIsUpdateModalOpened] = useState(false);
    const [isChargeMoneyModalOpened, setIsChargeMoneyModalOpened] = useState(false);
    const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
    const [days, setDays] = useState<DayItem[]>([]);
    const [hour, setHour] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>();
    const [isSubmittingCreation, setIsSubmittingCreation] = useState(false);
    const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
    const [isSubmittingMoneyCharge, setIsSubmittingMoneyCharge] = useState(false);
    const [amountToCharge, setAmountToCharge] = useState<number>(0);

    useEffect(() => {
        const daysToState = [];
        for (const date of dayItems) {
            if (!props.wallet) {
                daysToState.push({ ...date, checked: false });
                continue;
            }
            if (props.wallet.datesOfCharge.some((day) => day.dayNumber === date.value)) {
                daysToState.push({ ...date, checked: true });
            } else {
                daysToState.push({ ...date, checked: false });
            }
        }

        if (props.wallet?.paymentMethodForCharging) {
            setPaymentMethod(
                props.customerPaymentMethods.find((paymentMethod) => paymentMethod.id === props.wallet?.paymentMethodForCharging)
            );
        }
        setDays(daysToState);
        setWallet({ ...props.wallet });
        if (props.wallet?.datesOfCharge[0]) {
            setHour(
                new Date(0, 0, 0, parseInt(props.wallet?.datesOfCharge[0].hour), parseInt(props.wallet?.datesOfCharge[0].minute)).getTime()
            );
        }
    }, [props.wallet]);

    const isConfirmButtonDisabled = (isCreation: boolean): boolean => {
        if (!wallet) return true;
        if (wallet.amountToCharge < 0.5) return true;
        if (isCreation && !wallet.isEnabled) return true;
        if (wallet.isEnabled) {
            if (days.filter((day) => day.checked).length === 0) return true;
            if (!hour) return true;
            if (!paymentMethod) return true;
        }
        return false;
    };

    const handleCreateWalletSubmit = async () => {
        setIsSubmittingCreation(true);
        const succeeded = await props.handleCreateWallet({
            ...wallet,
            amountToCharge: parseInt(wallet.amountToCharge as unknown as string),
            datesOfCharge: days
                .filter((day) => day.checked)
                .map((day) => ({
                    dayNumber: day.value,
                    hour: new Date(hour).getHours().toString(),
                    minute: new Date(hour).getMinutes().toString(),
                })),
            paymentMethodForCharging: paymentMethod?.id,
            id: "",
            last4Numbers: "",
        });
        setIsSubmittingCreation(false);
        if (succeeded) setIsCreateModalOpened(false);
    };

    const handleUpdateWalletSubmit = async () => {
        setIsSubmittingUpdate(true);
        const succeeded = await props.handleUpdateWallet({
            ...wallet,
            amountToCharge: parseInt(wallet.amountToCharge as unknown as string),
            datesOfCharge: days
                .filter((day) => day.checked)
                .map((day) => ({
                    dayNumber: day.value,
                    hour: new Date(hour).getHours().toString(),
                    minute: new Date(hour).getMinutes().toString(),
                })),
            paymentMethodForCharging: paymentMethod?.id,
            id: "",
            last4Numbers: "",
        });
        setIsSubmittingUpdate(false);
        if (succeeded) setIsUpdateModalOpened(false);
    };

    const handleChargeMoneySubmit = async () => {
        setIsSubmittingMoneyCharge(true);
        const succeeded = await props.handleChargeMoney(amountToCharge);
        setIsSubmittingMoneyCharge(false);
        if (succeeded) setIsChargeMoneyModalOpened(false);
    };

    return (
        <>
            <PaperWithTitleContainer title="Billetera" fullWidth>
                <>
                    <Typography variant="subtitle2"></Typography>
                    {!props.wallet ? (
                        <Typography
                            variant="subtitle2"
                            color="primary"
                            style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                            onClick={() => setIsCreateModalOpened(true)}
                        >
                            Crear billetera
                        </Typography>
                    ) : (
                        <Box>
                            <Typography variant="body1" paragraph>
                                {`Saldo actual: ${props.wallet.balance ?? 0} ${!props.wallet?.isEnabled ? "(Recarga deshabilitada)" : ""}`}
                            </Typography>
                            <Box display={"flex"} flexWrap={"wrap"}>
                                <Typography
                                    variant="subtitle2"
                                    color="primary"
                                    style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto", marginRight: 8 }}
                                    onClick={() => setIsUpdateModalOpened(true)}
                                >
                                    Actualizar billetera
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    style={{ textTransform: "uppercase", cursor: "pointer", marginTop: "auto" }}
                                    onClick={() => setIsChargeMoneyModalOpened(true)}
                                >
                                    Cargar saldo
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </>
            </PaperWithTitleContainer>

            {isCreateWalletModalOpened && (
                <ComplexModal
                    fullWidth
                    maxWidth="md"
                    title="Crear billetera"
                    component={
                        <CreateWalletModal
                            wallet={wallet}
                            customerPaymentMethods={props.customerPaymentMethods}
                            days={days}
                            setDays={setDays}
                            hour={hour}
                            setHour={setHour}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            setWallet={setWallet}
                        />
                    }
                    open={isCreateWalletModalOpened}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Crear billetera"
                    handleCancelButton={() => setIsCreateModalOpened(false)}
                    handleConfirmButton={() => handleCreateWalletSubmit()}
                    handleClose={() => setIsCreateModalOpened(false)}
                    isConfirmButtonDisabled={isConfirmButtonDisabled(true) || isSubmittingCreation}
                />
            )}

            {isUpdateWalletModalOpened && (
                <ComplexModal
                    fullWidth
                    maxWidth="md"
                    title="Actualizar billetera"
                    component={
                        <UpdateWalletModal
                            wallet={wallet}
                            customerPaymentMethods={props.customerPaymentMethods}
                            days={days}
                            setDays={setDays}
                            hour={hour}
                            setHour={setHour}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            setWallet={setWallet}
                        />
                    }
                    open={isUpdateWalletModalOpened}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Actualizar billetera"
                    handleCancelButton={() => setIsUpdateModalOpened(false)}
                    handleConfirmButton={() => handleUpdateWalletSubmit()}
                    handleClose={() => setIsUpdateModalOpened(false)}
                    isConfirmButtonDisabled={isConfirmButtonDisabled(false) || isSubmittingUpdate}
                />
            )}

            {isChargeMoneyModalOpened && (
                <ComplexModal
                    title="Cargar saldo"
                    component={<ChargeMoneyToWalletModal amountToCharge={amountToCharge} setAmountToCharge={setAmountToCharge} />}
                    open={isChargeMoneyModalOpened}
                    cancelButtonText="Cancelar"
                    confirmButtonText="Cargar saldo"
                    handleCancelButton={() => setIsChargeMoneyModalOpened(false)}
                    handleConfirmButton={handleChargeMoneySubmit}
                    handleClose={() => setIsChargeMoneyModalOpened(false)}
                    isConfirmButtonDisabled={isSubmittingMoneyCharge}
                />
            )}
        </>
    );
};

export default CustomerWallet;

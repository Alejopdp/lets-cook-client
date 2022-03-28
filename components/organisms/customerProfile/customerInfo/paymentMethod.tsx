// Utils & Config
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

// External components
import { Typography } from "@material-ui/core";
import PaymentMethodModal from "./customerInfoModals/paymentMethodModal";
import ComplexModal from "../../../molecules/complexModal/complexModal";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import { PaymentMethod, PaymentMethodProps } from "../interface";
import { changeDefaultPaymentMethod } from "helpers/serverRequests/customer";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const PaymentMethods = (props: PaymentMethodProps) => {
    const [isPaymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedPaymentMethodId, setselectedPaymentMethodId] = useState(null);
    const { userInfo } = useUserInfoStore();

    const canEdit = useMemo(() => Array.isArray(Permission.UPDATE_CUSTOMER) && userInfo.permissions.includes(Permission.UPDATE_CUSTOMER));

    const defaultPaymentMethod: PaymentMethod | undefined = useMemo<PaymentMethod | undefined>((): PaymentMethod | undefined => {
        const defaultPaymentMethod: PaymentMethod | undefined = props.paymentMethods.find((paymentMethod) => paymentMethod.isDefault);

        if (!!defaultPaymentMethod) {
            setselectedPaymentMethodId(defaultPaymentMethod.id);
        }

        return defaultPaymentMethod;
    }, [props.paymentMethods]);

    const handleModifyPaymentMethod = async () => {
        if (selectedPaymentMethodId === defaultPaymentMethod.id) {
            setPaymentMethodModalOpen(false);
            return;
        }

        const res = await changeDefaultPaymentMethod(selectedPaymentMethodId, props.customerId);

        if (res.status === 200) {
            props.handleUpdatePaymentMethods(selectedPaymentMethodId);
            setPaymentMethodModalOpen(false);
            enqueueSnackbar("Método de pago modificado", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("No se ha podido modificar el método de pago", {
                variant: "error",
            });
        }
    };

    const handleChange = (newPaymentMethodId: string) => {
        setselectedPaymentMethodId(newPaymentMethodId);
    };

    return (
        <>
            {!!defaultPaymentMethod && (
                <>
                    <PaperWithTitleContainer title="Método de pago" fullWidth>
                        <Typography variant="subtitle2">Tarjeta</Typography>
                        <Typography variant="body1" paragraph>
                            {defaultPaymentMethod.card}
                        </Typography>

                        <Typography variant="subtitle2">Vencimiento</Typography>
                        <Typography variant="body1" paragraph>
                            {defaultPaymentMethod.expirationDate}
                        </Typography>

                        {canEdit && (
                            <Typography
                                variant="subtitle2"
                                color="primary"
                                style={{ textTransform: "uppercase", cursor: "pointer" }}
                                onClick={() => setPaymentMethodModalOpen(true)}
                            >
                                Modificar método de pago
                            </Typography>
                        )}
                    </PaperWithTitleContainer>
                    {isPaymentMethodModalOpen && (
                        <ComplexModal
                            title="Modificar método de pago"
                            component={
                                <PaymentMethodModal
                                    handleUpdatePaymentMethods={props.handleUpdatePaymentMethods}
                                    selectedPaymentMethodId={selectedPaymentMethodId}
                                    handlePaymentMethodChange={handleChange}
                                    paymentMethods={props.paymentMethods}
                                    defaultPaymentMethod={defaultPaymentMethod}
                                />
                            }
                            open={isPaymentMethodModalOpen}
                            cancelButtonText="Cancelar"
                            confirmButtonText="Modificar método de pago"
                            handleCancelButton={() => setPaymentMethodModalOpen(false)}
                            handleConfirmButton={handleModifyPaymentMethod}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default PaymentMethods;

PaymentMethods.propTypes = {};

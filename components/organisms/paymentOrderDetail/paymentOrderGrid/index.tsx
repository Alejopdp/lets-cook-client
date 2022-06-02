// Utils & Config
import React, { useState, useMemo, useEffect } from "react";
import { Typography, useTheme } from "@material-ui/core";

// External components
import { Grid, Button } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";
import DataDisplayLink from "../../../molecules/dataDisplay/dataDisplayLink";
import DataDisplayPaymentOrderTable from "./dataDisplayPaymentOrderTable";
import AmountDetails from "../../../molecules/amountDetails";
import Refund from "./refund";
import RefundModal from "./refundModal";
import { useSnackbar } from "notistack";
import { chargeOnePaymentOrder, refundPaymentOrder, retryPayment } from "helpers/serverRequests/paymentOrder";
import { PaymentOrderState } from "helpers/types/paymentOrderState";
import { cancelAPaymentOrder } from "helpers/serverRequests/paymentOrder";
import { useRouter } from "next/router";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const PaymentOrderGrid = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [isSubmitting, setisSubmitting] = useState(false);
    const { userInfo } = useUserInfoStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.VIEW_PAYMENT_ORDERS)) router.back();

        setIsLoading(false);
    }, [userInfo]);

    const canEdit = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.UPDATE_PAYMENT_ORDER),
        [userInfo]
    );

    const columns = [
        { align: "left", text: "Número de pedido" },
        { align: "left", text: "Plan" },
        { align: "left", text: "Variante" },
        { align: "left", text: "Frecuencia" },
        { align: "right", text: "Monto" },
        { align: "left", text: "" },
    ];

    const [amountToRefund, setAmountToRefund] = useState(0);
    const [openRefundModal, setOpenRefundModal] = useState(false);

    const handleChangeRefundInput = (event) => {
        event.preventDefault();
        setAmountToRefund(event.target.value);
    };

    // Refund Modal Functions

    const handleClickOpenRefundModal = () => {
        setOpenRefundModal(true);
    };

    const handleCloseRefundModal = () => {
        setOpenRefundModal(false);
    };

    const handleRefund = async () => {
        const res = await refundPaymentOrder(props.paymentOrder.id, parseFloat(amountToRefund));

        if (res && res.status === 200) {
            enqueueSnackbar("Reembolso aplicado correctamenta", { variant: "success" });
            props.setpaymentOrder({ ...props.paymentOrder, state: res.data.state, quantityRefunded: res.data.quantityRefunded });
            setAmountToRefund(0);
            setOpenRefundModal(false);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleChargePaymentOrder = async () => {
        return;
        setisSubmitting(true);
        const res = await chargeOnePaymentOrder(props.paymentOrder.id);

        if (res && res.status === 200) {
            props.reload();
            enqueueSnackbar("Orden cobrada correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisSubmitting(false);
    };

    const handleRetryPayment = async () => {
        setisSubmitting(true);
        const res = await retryPayment(props.paymentOrder.id);

        if (res && res.status === 200) {
            props.reload();
            enqueueSnackbar("Orden cobrada correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisSubmitting(false);
    };

    const handleCancelPayment = async () => {
        setisSubmitting(true);
        const res = await cancelAPaymentOrder(props.paymentOrder.id);

        if (res && res.status === 200) {
            router.push("/ordenes");
            enqueueSnackbar("Orden cancelada correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisSubmitting(false);
    };

    if (isLoading) return <></>;
    return (
        <>
            <Grid item xs={12} md={8}>
                <PaperWithTitleContainer fullWidth={true} title="Información general">
                    <DataDisplay title="Payment Order ID" text={props.paymentOrder.humanId} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Cliente" text={props.paymentOrder.customerName} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Fecha de cobro" text={props.paymentOrder.billingDate} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Estado" text={props.paymentOrder.state} style={{ marginBottom: theme.spacing(3) }} />
                    {!!props.paymentOrder.paymentIntentId && (
                        <DataDisplayLink
                            title="Stripe Transaction ID"
                            text={props.paymentOrder.paymentIntentId}
                            link={`https://dashboard.stripe.com/payments/${props.paymentOrder.paymentIntentId}`}
                            style={{ marginBottom: theme.spacing(3) }}
                        />
                    )}
                    <DataDisplayPaymentOrderTable
                        title="Ordenes relacionadas"
                        columns={columns}
                        rows={props.paymentOrder.orders.filter((order) => order.state !== "ORDER_CANCELLED")}
                    />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Detalle del importe">
                            <AmountDetails
                                hasRefund
                                data={{
                                    subtotal: props.paymentOrder.subtotal,
                                    shippingCost: props.paymentOrder.shippingCost,
                                    discount: props.paymentOrder.discountAmount,
                                    total: props.paymentOrder.totalAmount - props.paymentOrder.quantityRefunded,
                                    taxes: props.paymentOrder.taxes,
                                    quantityRefunded: props.paymentOrder.quantityRefunded,
                                }}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    {(props.paymentOrder.couponCodes.length || []) > 0 && (
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Cupones utilizados">
                                {props.paymentOrder.couponCodes.map((couponCode) => (
                                    <Typography>{couponCode}</Typography>
                                ))}
                            </PaperWithTitleContainer>
                        </Grid>
                    )}
                    {(props.paymentOrder.state === PaymentOrderState.PAYMENT_ORDER_BILLED ||
                        props.paymentOrder.state === PaymentOrderState.PAYMENT_ORDER_PARTIALLY_REFUNDED) && (
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Reembolso">
                                <Refund
                                    handleClick={handleClickOpenRefundModal}
                                    totalAmount={props.paymentOrder.totalAmount}
                                    value={amountToRefund}
                                    handleChange={handleChangeRefundInput}
                                    quantityRefunded={props.paymentOrder.quantityRefunded}
                                />
                            </PaperWithTitleContainer>
                        </Grid>
                    )}
                    {props.paymentOrder.state === PaymentOrderState.PAYMENT_ORDER_ACTIVE && canEdit && (
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                                <div>
                                    <Button size="medium" color="secondary" onClick={handleChargePaymentOrder} disabled={isSubmitting}>
                                        PAGAR AHORA
                                    </Button>
                                </div>
                            </PaperWithTitleContainer>
                        </Grid>
                    )}

                    {props.paymentOrder.state === PaymentOrderState.PAYMENT_ORDER_REJECTED && (
                        <Grid item xs={12}>
                            <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                                <div>
                                    <Button size="medium" color="secondary" onClick={handleRetryPayment} disabled={isSubmitting}>
                                        REINTENTAR COBRO
                                    </Button>
                                </div>
                                <div>
                                    <Button size="medium" color="secondary" onClick={handleCancelPayment} disabled={isSubmitting}>
                                        CANCELAR PAGO
                                    </Button>
                                </div>
                            </PaperWithTitleContainer>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <RefundModal
                open={openRefundModal}
                handleClose={handleCloseRefundModal}
                handlePrimaryButtonClick={handleRefund}
                amountToRefund={amountToRefund}
                // data={changePlanData}
            />
        </>
    );
};

export default PaymentOrderGrid;

// Utils & Config
import React, { useState } from "react";
import { useTheme } from "@material-ui/core";

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
import { chargeOnePaymentOrder } from "helpers/serverRequests/paymentOrder";

const PaymentOrderGrid = (props) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [paymentOrderDataAfterPayment, setpaymentOrderDataAfterPayment] = useState({
        paymentIntentId: "",
        state: "",
    });
    const [isSubmitting, setisSubmitting] = useState(false);

    const columns = [
        { align: "left", text: "Order ID" },
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

    const handleRefund = () => {
        alert("refunded");
        setOpenRefundModal(false);
    };

    const handleChargePaymentOrder = async () => {
        setisSubmitting(true);
        const res = await chargeOnePaymentOrder(props.paymentOrder.id);

        if (res && res.status === 200) {
            setpaymentOrderDataAfterPayment({ paymentIntentId: res.data.paymentIntentId, state: res.data.paymentOrderState });
            enqueueSnackbar("Orden cobrada correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setisSubmitting(false);
    };

    return (
        <>
            <Grid item xs={12} md={8}>
                <PaperWithTitleContainer fullWidth={true} title="Información general">
                    <DataDisplay title="Payment Order ID" text={props.paymentOrder.id} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Cliente" text={props.paymentOrder.customerName} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Fecha de cobro" text={props.paymentOrder.billingDate} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay
                        title="Estado"
                        text={props.paymentOrder.state || paymentOrderDataAfterPayment.state}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
                    {(!!props.paymentOrder.paymentIntentId || !!paymentOrderDataAfterPayment.paymentIntentId) && (
                        <DataDisplayLink
                            title="Stripe Transaction ID"
                            text={props.paymentOrder.paymentIntentId || paymentOrderDataAfterPayment.paymentIntentId}
                            link={`https://dashboard.stripe.com/payments/${
                                props.paymentOrder.paymentIntentId || paymentOrderDataAfterPayment.paymentIntentId
                            }`}
                            style={{ marginBottom: theme.spacing(3) }}
                        />
                    )}
                    <DataDisplayPaymentOrderTable title="Ordenes relacionadas" columns={columns} rows={props.paymentOrder.orders} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Detalle del monto">
                            <AmountDetails
                                data={{
                                    subtotal: props.paymentOrder.subtotal,
                                    shippingCost: props.paymentOrder.shippingCost,
                                    discount: props.paymentOrder.discountAmount,
                                    total: props.paymentOrder.totalAmount,
                                    taxes: props.paymentOrder.taxes,
                                }}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Reembolso">
                            <Refund
                                handleClick={handleClickOpenRefundModal}
                                totalAmount={props.paymentOrder.totalAmount}
                                value={amountToRefund}
                                handleChange={handleChangeRefundInput}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    {props.paymentOrder.state === "Activa" &&
                        paymentOrderDataAfterPayment.state !== "PAYMENT_ORDER_BILLED" && ( // TO DO: Use enum with PAYMENY_ORDER_ACTIVE value
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

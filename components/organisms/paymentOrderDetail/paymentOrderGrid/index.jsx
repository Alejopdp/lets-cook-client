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

const PaymentOrderGrid = (props) => {
    const theme = useTheme();

    const paymentOrderDetail = {
        paymentOrderId: "123",
        clientName: "Alejo Scotti",
        paymentDate: "10/12/2021",
        state: "Pago exitoso",
        stripeTransactionId: "pi_1JAZcjH24hlkZqHlK0aiu9C4",
    };

    const amountDetail = {
        subtotal: 60,
        shippingCost: 5,
        discount: 5,
        taxes: 6,
        total: 60,
    };

    const columns = [
        { align: "left", text: "Order ID" },
        { align: "left", text: "Plan" },
        { align: "left", text: "Variante" },
        { align: "left", text: "Frecuencia" },
        { align: "right", text: "Monto" },
        { align: "left", text: "" },
    ];

    const rows = [
        {
            orderId: "324",
            planName: "Plan Familiar",
            planVariantDescription: "3 recetas para 2 personas",
            frequency: "Semanal",
            orderAmount: "30 EU",
        },
        {
            orderId: "325",
            planName: "Plan Vinos",
            planVariantDescription: "Pack mediano - Vino tinto",
            frequency: "Por única vez",
            orderAmount: "20 EU",
        },
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

    return (
        <>
            <Grid item xs={12} md={8}>
                <PaperWithTitleContainer fullWidth={true} title="Información general">
                    <DataDisplay title="Payment Order ID" text={props.paymentOrder.id} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Cliente" text={props.paymentOrder.customerName} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Fecha de cobro" text={props.paymentOrder.billingDate} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplay title="Estado" text={props.paymentOrder.state} style={{ marginBottom: theme.spacing(3) }} />
                    <DataDisplayLink
                        title="Stripe Transaction ID"
                        text={props.paymentOrder.stripeTransactionId}
                        link={`https://dashboard.stripe.com/payments/${paymentOrderDetail.stripeTransactionId}`}
                        style={{ marginBottom: theme.spacing(3) }}
                    />
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
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                            <div>
                                <Button size="medium" color="secondary" onClick={() => alert("paynow")}>
                                    PAGAR AHORA
                                </Button>
                            </div>
                        </PaperWithTitleContainer>
                    </Grid>
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

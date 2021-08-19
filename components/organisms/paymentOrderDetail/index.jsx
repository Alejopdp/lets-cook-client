// Utils & Config
import React, { useState, useEffect } from "react";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import PaymentOrderGrid from "./paymentOrderGrid";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getPaymentOrder } from "../../../helpers/serverRequests/paymentOrder";

const PaymentOrderDetail = (props) => {
    const router = useRouter();
    const [paymentOrder, setpaymentOrder] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getPaymentOrderById = async () => {
            const res = await getPaymentOrder(router.query.paymentOrderId, router.locale);

            if (res.status === 200) {
                setpaymentOrder(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }

            setisLoading(false);
        };

        getPaymentOrderById();
    }, []);
    return (
        <>
            <DashboardWithBackTitle title="Detalle de la orden de pago" />
            {!isLoading && <PaymentOrderGrid paymentOrder={paymentOrder} />}
        </>
    );
};

export default PaymentOrderDetail;

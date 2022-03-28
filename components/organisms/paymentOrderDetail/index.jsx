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
import useLocalStorage from "hooks/useLocalStorage/localStorage";

const PaymentOrderDetail = (props) => {
    const router = useRouter();
    const [paymentOrder, setpaymentOrder] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [reloadCounter, setReloadCounter] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const { getFromLocalStorage } = useLocalStorage();

    useEffect(() => {
        const getPaymentOrderById = async () => {
            const res = await getPaymentOrder(getFromLocalStorage("token"), router.query.paymentOrderId, router.locale);

            if (res.status === 200) {
                setpaymentOrder(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }

            setisLoading(false);
        };

        getPaymentOrderById();
    }, [reloadCounter]);
    return (
        <>
            <DashboardWithBackTitle title="Detalle de la orden de pago" />
            {!isLoading && (
                <PaymentOrderGrid
                    paymentOrder={paymentOrder}
                    setpaymentOrder={setpaymentOrder}
                    reload={() => setReloadCounter(reloadCounter + 1)}
                />
            )}
        </>
    );
};

export default PaymentOrderDetail;

// Utils & Config
import React, { useEffect, useState } from "react";
import { getOrderById } from "../../../helpers/serverRequests/order";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import OrderGrid from "./orderGrid";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getRecipesForOrder } from "../../../helpers/serverRequests/recipe";
import useLocalStorage from "hooks/useLocalStorage/localStorage";

const OrderDetail = (props) => {
    const router = useRouter();
    const [order, setorder] = useState({});
    const [weekRecipes, setweekRecipes] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const { getFromLocalStorage } = useLocalStorage();

    useEffect(() => {
        const getOrder = async () => {
            const res = await getOrderById(router.query.id, getFromLocalStorage("token"), router.locale);

            if (res.status === 200) {
                setorder(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
                setisLoading(false);
                return;
            }

            const weekRes = await getRecipesForOrder(router.query.id, getFromLocalStorage("token"));

            if (weekRes.status === 200) {
                setweekRecipes(weekRes.data.recipes);
            } else {
                enqueueSnackbar(weekRes.data.message, { variant: "error" });
            }
            setisLoading(false);
        };

        getOrder();
    }, []);

    return (
        <>
            <DashboardWithBackTitle title="Detalle de la orden" />
            {!isLoading && <OrderGrid order={order} weekRecipes={weekRecipes} setorder={setorder} />}
        </>
    );
};

export default OrderDetail;

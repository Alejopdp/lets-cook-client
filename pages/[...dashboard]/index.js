// Utils & config
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import cookies from "js-cookie";
import axios from "axios";

// Internal Hooks & Helpers
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "../../hooks/useLocalStorage/localStorage";
import { pagesPropsGetter } from "../../helpers/pagesPropsGetter/pagesPropsGetter";

// External components
import { Box, Typography, makeStyles } from "@material-ui/core";

// Internal components
import LayoutFixedSidebar from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import RecipesDashboard from "../../components/organisms/recipesDashboard/";
import UsersDashboard from "../../components/organisms/usersDashboard/usersDashboard";
import PlansDashboard from "../../components/organisms/plansDashboard/plansDashboard";
import CreatePlan from "../../components/organisms/createPlan/createPlan";
import CreateUserDashboard from "../../components/organisms/createUserDashboard/createUserDashboard";
import UpdateUserDashboard from "../../components/organisms/updateUserDashboard";
import CreateRecipe from "../../components/organisms/createRecipe/createRecipe";
import UpdateRecipe from "../../components/organisms/updateRecipe/updateRecipe";
import ErrorPage from "../../components/molecules/errorPage/errorPage";
import CouponsForm from "../../components/organisms/coupons/couponsForm";
import ShippingDashboard from "../../components/organisms/shippingDashboard";
import CreateShippingZone from "../../components/organisms/createShippingZone/createShippingZone";
import UpdateShippingZone from "../../components/organisms/updateShippingZone/updateShippingZone";
import UpdatePlan from "../../components/organisms/updatePlan/updatePlan";
import CouponsDashboard from "../../components/organisms/couponsDashboard";
import CouponDetail from "../../components/organisms/couponDetail";
import { useUserInfoStore } from "../../stores/auth";
import OrdersDashboard from "../../components/organisms/ordersDashboard/";
import PaymentOrderDetail from "../../components/organisms/paymentOrderDetail";
import OrderDetail from "../../components/organisms/orderDetail";
import SubscriptionsDashboard from "../../components/organisms/subscriptionsDashboard";
import SubscriptionDetail from "../../components/organisms/subscriptionDetail";
import CustomersDashboard from "../../components/organisms/customersDashboard/customersDashboard";
import CreateCustomer from "../../components/organisms/createClient/createClient";
import CustomerProfile from "../../components/organisms/customerProfile/customerProfile";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },
    backBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "",
        paddingLeft: theme.spacing(35),
        paddingTop: theme.spacing(10),
        "@media (max-width: 780px)": {
            border: "1px solid red",
            paddingLeft: theme.spacing(0),
        },
    },
}));

const Index = ({ token, ...props }) => {
    const route = useRouter();
    const classes = useStyles();
    const { getFromLocalStorage, resetLocalStorage } = useLocalStorage();
    const setuserInfo = useUserInfoStore((state) => state.setuserInfo);

    useEffect(() => {
        const userInfo = getFromLocalStorage("userInfo");

        if (!!userInfo) setuserInfo(userInfo);
    }, []);

    useEffect(() => {
        if (props.status === 401) {
            resetLocalStorage();
            cookies.remove("token");
        }
    }, [route.asPath]);

    const getSectionComponent = (path) => {
        /* TODO: IMPORTANT!!!
            optimize the cases for return componet dynamically
        **/
        if (!!props.error) {
            return (
                <Box width="100%" height="100vh" className={classes.root}>
                    <Typography variant="h4">No yet / show here 404 page</Typography>
                </Box>
            );
        }

        switch (path) {
            case "recetas":
                return <RecipesDashboard filterList={props.filterList} recipesList={props.recipesList} hasError={props.hasError} />;

            case "recetas/crear":
                return <CreateRecipe formData={props.formData} recipeData={props.recipeData} />;

            case "recetas/modificar":
                return <UpdateRecipe formData={props.formData} recipeData={props.recipeData} hasError={props.hasError} />;

            case "gestion-de-usuarios":
                return <UsersDashboard users={props.users} />;

            case "gestion-de-usuarios/crear":
                return <CreateUserDashboard roles={props.roles} />;

            case "gestion-de-usuarios/modificar":
                return <UpdateUserDashboard roles={props.roles} user={props.user} />;

            case "planes":
                return <PlansDashboard plans={props.plans} />;

            case "planes/crear":
                return <CreatePlan additionalPlans={props.additionalPlans} />;

            case "planes/modificar":
                return <UpdatePlan additionalPlans={props.additionalPlans} plan={props.plan} />;

            case "cupon":
                return <CouponDetail coupon={props.coupon} />;

            case "cupones":
                return <CouponsDashboard coupons={props.coupons} />;

            case "cupones/crear":
                return <CouponsForm lang={props.langs.couponsForm} plans={props.plans} />;

            case "gestion-de-envios":
                return <ShippingDashboard shippingZones={props.shippingZones} />;

            case "gestion-de-envios/crear":
                return <CreateShippingZone />;

            case "gestion-de-envios/modificar":
                return <UpdateShippingZone shippingZone={props.shippingZone} />;

            case "ordenes":
                return <OrdersDashboard />;

            case "ordenes/detalle-orden-de-pago":
                return <PaymentOrderDetail />;

            case "ordenes/detalle-orden":
                return <OrderDetail />;

            case "suscripciones":
                return <SubscriptionsDashboard />;

            case "suscripciones/detalle":
                return <SubscriptionDetail />;
            case "gestion-de-clientes":
                return <CustomersDashboard />;

            case "gestion-de-clientes/modificar":
                return <CustomerProfile plans={props.plans} />;

            case "gestion-de-clientes/crear":
                return <CreateCustomer />;

            default:
                return (
                    <Box width="100%" height="100vh" className={classes.root}>
                        <Typography variant="h1">No yet / show here 404 page</Typography>
                    </Box>
                );
        }
    };
    return (
        <SnackbarProvider maxSnack={3}>
            <LayoutFixedSidebar lang={props.langs}>
                {props.hasError ? <ErrorPage errorMessage={props.hasError} /> : getSectionComponent(route.query.dashboard.join("/"))}
            </LayoutFixedSidebar>
        </SnackbarProvider>
    );
};

Index.propTypes = {};

export async function getServerSideProps(context) {
    const langs = require("../../lang");
    const token = context.req.cookies.token;

    if (!token) {
        return { props: { hasError: "Usuario no autorizado", status: 401 } };
    }

    const props = await pagesPropsGetter(context.query, context.locale, context.req.cookies.token);

    return {
        props: { ...props, langs: { ...langs } },
    };
}

export default Index;

// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { CustomerProfileProps, Subscription, Order, PaymentOrder, Personaldata } from "./interface";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import CustomerSubscriptionsTable from "./customerSubscriptionsTable";
import CustomerCalendarTable from "./customerCalendarTable";
import CustomerPurchaseHistoryTable from "./customerPurchaseHistoryTable";
import CustomerInfo from "./customerInfo/customerInfo";
import CustomerEvents from "./customerEvents";
import { updateCustomer, updateCustomerPersonalData } from "helpers/serverRequests/customer";
import { useSnackbar } from "notistack";

const crumbs = [
    {
        key: "subscriptions",
        label: "Suscripciones",
    },
    {
        key: "calendar",
        label: "Calendario",
    },
    {
        key: "purchases",
        label: "Histórico de compras",
    },
    {
        key: "info",
        label: "Información del cliente",
    },
    {
        key: "events",
        label: "Eventos",
    },
];

const CustomerProfile = (props: CustomerProfileProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [breadcrumb, setBreadcrumb] = useState("subscriptions");
    const [customer, setCustomer] = useState<{
        personalData: Personaldata;
        subscriptions: Subscription[];
        orders: Order[];
        paymentOrders: PaymentOrder[];
    }>({
        personalData: props.data.personalData || { shippingAddress: {}, billingData: {}, paymentMethods: [] },
        // Subscriptions table
        subscriptions: props.data.subscriptions,

        // Calendar table
        orders: props.data.orders,

        // Purchase history table
        paymentOrders: props.data.paymentOrders,
        // Events table
        events: [
            {
                date: "09/08/2021 15:30 hs.",
                performedBy: "Usuario",
                event: "Se ha realizado un cambio de plan a Plan Ahorro",
            },
            {
                date: "09/08/2021 15:30 hs.",
                performedBy: "Usuario",
                event: "Se ha realizado un cambio en la dirección de entrega",
            },
            {
                date: "09/08/2021 15:30 hs.",
                performedBy: "Administrador",
                event: "Se ha realizado un cambio de plan a Plan Ahorro",
            },
        ],
    });

    const handleUpdatePersonalData = async (formData: Personaldata) => {
        const res = await updateCustomerPersonalData({ ...formData, id: props.data.personalData.id });

        if (res.status === 200) {
            setCustomer({
                ...customer,
                personalData: {
                    ...customer.personalData,
                    ...formData,
                },
            });
            enqueueSnackbar("Cliente modificado correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleUpdateDeliveryAddress = (formData) => {
        setCustomer({
            ...customer,
            personalData: {
                ...customer.personalData,
                shippingAddress: formData,
            },
        });
    };

    const handleUpdateBillingData = (formData) => {
        setCustomer({
            ...customer,
            personalData: {
                ...customer.personalData,
                billingData: formData,
            },
        });
    };

    const handleUpdatePaymentMethods = (newPaymentMethodId: string) => {
        const newPaymentMethods = customer.personalData.paymentMethods.map((method) => ({
            ...method,
            isDefault: newPaymentMethodId === method.id,
        }));

        setCustomer({
            ...customer,
            personalData: {
                ...customer.personalData,
                paymentMethods: newPaymentMethods,
            },
        });
    };

    const { container, breadcrumbs, active } = useStyles();

    var currentCustomerInfo = <></>;

    switch (true) {
        case breadcrumb === "subscriptions":
            currentCustomerInfo = <CustomerSubscriptionsTable subscriptions={customer.subscriptions} />;
            break;

        case breadcrumb === "calendar":
            currentCustomerInfo = <CustomerCalendarTable orders={customer.orders} />;
            break;

        case breadcrumb === "purchases":
            currentCustomerInfo = <CustomerPurchaseHistoryTable paymentOrders={customer.paymentOrders} />;
            break;

        case breadcrumb === "info":
            currentCustomerInfo = (
                <CustomerInfo
                    handleUpdatePersonalData={handleUpdatePersonalData}
                    handleUpdateDeliveryAddress={handleUpdateDeliveryAddress}
                    handleUpdateBillingData={handleUpdateBillingData}
                    handleUpdatePaymentMethods={handleUpdatePaymentMethods}
                    customer={customer}
                    setCustomer={setCustomer}
                />
            );
            break;

        case breadcrumb === "events":
            currentCustomerInfo = <CustomerEvents events={customer.events} />;
            break;

        default:
            currentCustomerInfo = <CustomerSubscriptionsTable subscriptions={customer.subscriptions} />;
    }

    return (
        <>
            <DashboardWithBackTitle title={`Perfil de ${customer.personalData.name} ${customer.personalData.lastName}`} />
            <Grid item xs={12}>
                <Box className={container}>
                    {crumbs.map((crumb, index) => (
                        <Typography
                            key={index}
                            className={breadcrumb === crumb.key ? clsx(active, breadcrumbs) : breadcrumbs}
                            variant="subtitle1"
                            onClick={() => setBreadcrumb(crumb.key)}
                        >
                            {crumb.label}
                        </Typography>
                    ))}
                </Box>
            </Grid>
            {currentCustomerInfo}
        </>
    );
};

export default CustomerProfile;

CustomerProfile.propTypes = {};

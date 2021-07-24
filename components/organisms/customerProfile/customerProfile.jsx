// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

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

const CustomerProfile = (props) => {
    const [breadcrumb, setBreadcrumb] = useState("subscriptions");
    const [customer, setCustomer] = useState({
        personalData: {
            name: "Alejo",
            lastName: "Scotti",
            email: "alejo@novolabs.xyz",
            phone1: "+34 686 234 345",
            phone2: null,
            bornDate: "14/12/98",
            preferredLanguage: "CA",

            id: 123456,

            deliveryAddress: {
                address: "[deliveryAddress] Calle Ing Fausto Elio 42, 54001, Valencia",
                clarifications: "Piso 2, Puerta 10",
                preferredSchedule: {
                    value: 1,
                    label: "De 8 a 12",
                },
            },

            billingData: {
                address: "[billingAddress] Calle Ing Fausto Elio 42, 54001, Valencia",
                clarifications: "Piso 2, Puerta 10",
                name: "Alejo Scotti",
                personalIdNumber: "39481743 V",
            },

            paymentMethod: {
                creditCard: "Visa terminada en 1234",
                cardExpirationDate: "08/12",
                savedCards: [
                    {
                        creditCard: "Visa terminada en 4321",
                        cardExpirationDate: "05/24",
                    },
                    {
                        creditCard: "Savi terminada en 1237",
                        cardExpirationDate: "05/24",
                    },
                ],
            },
        },
        // Subscriptions table
        subscriptions: [
            {
                subscriptionId: 123,
                plan: "Plan Familiar",
                variant: "4 personas / 2 recetas",
                price: 50,
                frequency: "Semanal",
                status: "Activo",
            },
            {
                subscriptionId: 321,
                plan: "Plan Vegano",
                variant: "2 personas / 2 recetas",
                price: 30,
                frequency: "Por única vez",
                status: "Activo",
            },
        ],

        // Calendar table
        orders: [
            {
                date: "09/08/2021",
                orderId: "001",
                plan: "Plan Familiar",
                variation: "2 personas / 2 recetas",
                price: 30,
                active: false,
            },
            {
                date: "09/08/2021",
                orderId: "002",
                plan: "Plan Familiar",
                variation: "2 personas / 2 recetas",
                price: 30,
                active: true,
            },
            {
                date: "09/08/2021",
                orderId: "003",
                plan: "Plan Familiar",
                variation: "2 personas / 2 recetas",
                price: 30,
                active: true,
            },
        ],

        // Purchase history table
        purchaseLogs: [
            {
                date: "09/08/2021",
                paymentOrderId: "534",
                ordersQty: 2,
                price: 30,
                status: "Pago exitoso",
            },
            {
                date: "09/08/2021",
                paymentOrderId: "534",
                ordersQty: 2,
                price: 30,
                status: "Pago fallido",
            },
            {
                date: "09/08/2021",
                paymentOrderId: "534",
                ordersQty: 2,
                price: 30,
                status: "Pago exitoso",
            },
        ],

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

    const handleUpdatePersonalData = (formData) => {
        setCustomer({
            ...customer,
            personalData: {
                ...customer.personalData,
                ...formData,
            },
        });
    };

    const handleUpdateDeliveryAddress = (formData) => {
        setCustomer({
            ...customer,
            personalData: {
                ...customer.personalData,
                deliveryAddress: formData
            }
        })
    }

    const handleUpdateBillingData = (formData) => {
        setCustomer({
            ...customer,
            personalData: {
                ...customer.personalData,
                billingData: formData
            }
        })
    }


    const { container, breadcrumbs, active } = useStyles();

    var currentCustomerInfo = <></>;

    switch (true) {
        case breadcrumb === "subscriptions":
            currentCustomerInfo = <CustomerSubscriptionsTable subscriptions={customer.subscriptions} plans={props.plans} />;
            break;

        case breadcrumb === "calendar":
            currentCustomerInfo = <CustomerCalendarTable orders={customer.orders} />;
            break;

        case breadcrumb === "purchases":
            currentCustomerInfo = <CustomerPurchaseHistoryTable purchaseLogs={customer.purchaseLogs} />;
            break;

        case breadcrumb === "info":
            currentCustomerInfo =
                <CustomerInfo
                    handleUpdatePersonalData={handleUpdatePersonalData}
                    handleUpdateDeliveryAddress={handleUpdateDeliveryAddress}
                    handleUpdateBillingData={handleUpdateBillingData}
                    customer={customer.personalData}
                />;
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

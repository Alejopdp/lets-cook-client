// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import CustomerSubscriptionsTable from "./customerSubscriptionsTable";
import CustomerCalendarTable from "./customerCalendarTable";
import CustomerPurchaseHistoryTable from "./customerPurchaseHistoryTable";
import CustomerInfo from "./customerInfo/customerInfo";
import CustomerEvents from "./customerEvents";

const customer = {
    personalData: {
        name: "Alejo",
        lastName: "Scotti",
        email: "alejo@novolabs.xyz",
        phone1: "+34 686 234 345",
        phone2: null,
        bornDate: "14/12/98",
        preferredLanguage: "CA",

        deliveryAddress: {
            address: "Calle Ing Fausto Elio 42, 54001, Valencia",
            clarifications: "Piso 2, Puerta 10",
            preferredSchedule: {
                value: 1,
                label: "De 8 a 12"
            },
        },

        billingData: {
            address: "Calle Ing Fausto Elio 42, 54001, Valencia",
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
                    cardExpirationDate: "05/24"
                },
                {
                    creditCard: "Savi terminada en 1237",
                    cardExpirationDate: "05/24"
                },
            ]
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
            status: "Activo"
        },
        {
            subscriptionId: 321,
            plan: "Plan Vegano",
            variant: "2 personas / 2 recetas",
            price: 30,
            frequency: "Por única vez",
            status: "Activo"
        },
    ],

    // Calendar table
    orders: [
        {
            date: "09/08/2021",
            orderId: "534",
            plan: "Plan Familiar",
            variation: "2 personas / 2 recetas",
            price: 30,
        },
        {
            date: "09/08/2021",
            orderId: "534",
            plan: "Plan Familiar",
            variation: "2 personas / 2 recetas",
            price: 30,
        },
        {
            date: "09/08/2021",
            orderId: "534",
            plan: "Plan Familiar",
            variation: "2 personas / 2 recetas",
            price: 30,
        },
    ],

    // Purchase history table
    purchaseLogs: [
        {
            date: "09/08/2021",
            paymentOrderId: "534",
            ordersQty: 2,
            price: 30,
            status: "Pago exitoso"
        },
        {
            date: "09/08/2021",
            paymentOrderId: "534",
            ordersQty: 2,
            price: 30,
            status: "Pago fallido"
        },
        {
            date: "09/08/2021",
            paymentOrderId: "534",
            ordersQty: 2,
            price: 30,
            status: "Pago exitoso"
        },
    ],

    // Events table
    events: [
        {
            date: "09/08/2021 15:30 hs.",
            performedBy: "Usuario",
            event: "Se ha realizado un cambio de plan a Plan Ahorro"
        },
        {
            date: "09/08/2021 15:30 hs.",
            performedBy: "Usuario",
            event: "Se ha realizado un cambio en la dirección de entrega"
        },
        {
            date: "09/08/2021 15:30 hs.",
            performedBy: "Administrador",
            event: "Se ha realizado un cambio de plan a Plan Ahorro"
        },
    ]
}

const crumbs = [
    {
        key: "subscriptions",
        label: "Suscripciones"
    },
    {
        key: "calendar",
        label: "Calendario"
    },
    {
        key: "purchases",
        label: "Histórico de compras"
    },
    {
        key: "info",
        label: "Información del cliente"
    },
    {
        key: "events",
        label: "Eventos"
    }
]

const CustomerProfile = () => {
    const [breadcrumb, setBreadcrumb] = useState("subscriptions")

    const { container, breadcrumbs, active } = useStyles();

    var currentCustomerInfo = <></>;

    switch (true) {
        case breadcrumb === "subscriptions":
            currentCustomerInfo = <CustomerSubscriptionsTable subscriptions={customer.subscriptions} />
            break;

        case breadcrumb === "calendar":
            currentCustomerInfo = <CustomerCalendarTable orders={customer.orders} />
            break;

        case breadcrumb === "purchases":
            currentCustomerInfo = <CustomerPurchaseHistoryTable purchaseLogs={customer.purchaseLogs} />
            break;

        case breadcrumb === "info":
            currentCustomerInfo = <CustomerInfo customer={customer.personalData} />
            break;

        case breadcrumb === "events":
            currentCustomerInfo = <CustomerEvents events={customer.events} />
            break;

        default:
            currentCustomerInfo = <CustomerSubscriptionsTable subscriptions={customer.subscriptions} />
    }

    return (
        <Container size="md">
            <DashboardWithBackTitle title={`Perfil de ${customer.personalData.name} ${customer.personalData.lastName}`} />

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

            {currentCustomerInfo}

        </Container>
    );
};

export default CustomerProfile;

CustomerProfile.propTypes = {

};

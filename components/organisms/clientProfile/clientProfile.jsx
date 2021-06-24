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
import ClientSubscriptionsTable from "./clientSubscriptionsTable";
import ClientCalendarTable from "./clientCalendarTable";
import ClientPurchaseHistoryTable from "./clientPurchaseHistoryTable";
import ClientInfo from "./clientInfo/clientInfo";
import ClientEvents from "./clientEvents";

const client = {
    personalData: {
        name: "Alejo",
        lastName: "Scotti",
        phone1: "+34 686 234 345",
        phone2: null,
        bornDate: null,
        preferredLanguage: "Español",

        deliveryAddress: {
            address: "Calle Ing Fausto Elio 42, 54001, Valencia",
            clarifications: "Piso 2, Puerta 10",
            preferredSchedule: null,
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

const ClientProfile = () => {
    const [breadcrumb, setBreadcrumb] = useState("subscriptions")

    const { container, breadcrumbs, active } = useStyles();

    var currentClientInfo = <></>;

    switch (true) {
        case breadcrumb === "subscriptions":
            currentClientInfo = <ClientSubscriptionsTable subscriptions={client.subscriptions} />
            break;

        case breadcrumb === "calendar":
            currentClientInfo = <ClientCalendarTable orders={client.orders} />
            break;

        case breadcrumb === "purchases":
            currentClientInfo = <ClientPurchaseHistoryTable purchaseLogs={client.purchaseLogs} />
            break;

        case breadcrumb === "info":
            currentClientInfo = <ClientInfo client={client.personalData} />
            break;

        case breadcrumb === "events":
            currentClientInfo = <ClientEvents events={client.events} />
            break;

        default:
            currentClientInfo = <ClientSubscriptionsTable subscriptions={client.subscriptions} />
    }

    return (
        <Container size="md">
            <DashboardWithBackTitle title={`Perfil de ${client.personalData.name} ${client.personalData.lastName}`} />

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

            {currentClientInfo}

        </Container>
    );
};

export default ClientProfile;

ClientProfile.propTypes = {

};

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

const client = {
    name: "Damián Sánchez"
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
            currentClientInfo = <ClientSubscriptionsTable />
            break;

        case breadcrumb === "calendar":
            currentClientInfo = <ClientCalendarTable />
            break;

        case breadcrumb === "purchases":
            currentClientInfo = <h1>Histórico de compras</h1>
            break;

        case breadcrumb === "info":
            currentClientInfo = <h1>Información del cliente</h1>
            break;

        case breadcrumb === "events":
            currentClientInfo = <h1>Eventos</h1>
            break;

        default:
            currentClientInfo = <h1>suscripciones</h1>
    }

    return (
        <Container size="lg">
            <DashboardWithBackTitle title={`Perfil de ${client.name}`} />

            <Box className={container}>
                {crumbs.map((crumb, index) => (
                    <Typography
                        key={index}
                        className={ breadcrumb === crumb.key ? clsx(active, breadcrumbs) : breadcrumbs }
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

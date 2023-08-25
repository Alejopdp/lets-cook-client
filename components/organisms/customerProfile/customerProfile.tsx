// Utils & Config
import React, { useState } from "react";
import useStyles from "./styles";
import clsx from "clsx";
import { CustomerProfileProps, CustomerInformation } from "./interface";

// External components
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
import { chargeMoneyToWallet, createWallet, updateCustomerPersonalData, updateWallet } from "helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import { FormData } from "./customerInfo/personalData";
import { Wallet } from "helpers/types/customer";

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
    const [customer, setCustomer] = useState<CustomerInformation>({
        ...props.data,
        // Subscriptions table
        subscriptions: props.data.subscriptions,

        // Calendar table
        orders: props.data.orders,

        // Purchase history table
        paymentOrders: props.data.paymentOrders,
        // Events table
        events: props.logs,
    });

    const handleUpdatePersonalData = async (formData: FormData): Promise<void> => {
        const res = await updateCustomerPersonalData({ ...formData, id: props.data.id });

        if (res.status === 200) {
            setCustomer({
                ...customer,
                ...formData,
            });
            enqueueSnackbar("Cliente modificado correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleCreateWallet = async (walletData: Wallet): Promise<boolean> => {
        const res = await createWallet(customer.id, walletData);

        if (res.status === 200) {
            setCustomer({
                ...customer,
                wallet: { ...walletData },
            });
            setCustomer({
                ...customer,
                paymentMethods: [
                    ...customer.paymentMethods,
                    {
                        id: "wallet",
                        card: "",
                        expirationDate: "",
                        isDefault: false,
                    },
                ],
            });
            enqueueSnackbar("Billetera creada correctamente", { variant: "success" });
            return true;
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al crear la billetera", { variant: "error" });
            return false;
        }
    };

    const handleUpdateWallet = async (walletData: Wallet): Promise<boolean> => {
        const res = await updateWallet(customer.id, walletData);

        if (res.status === 200) {
            setCustomer({
                ...customer,
                wallet: { ...walletData },
            });
            enqueueSnackbar("Billetera modificada correctamente", { variant: "success" });
            return true;
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al modificar la billetera", { variant: "error" });
            return false;
        }
    };

    const handleUpdateDeliveryAddress = (formData) => {
        setCustomer({
            ...customer,
            shippingAddress: formData,
        });
    };

    const handleUpdateBillingData = (formData) => {
        setCustomer({
            ...customer,
            billingData: formData,
        });
    };

    const handleUpdatePaymentMethods = (newPaymentMethodId: string) => {
        const newPaymentMethods = customer.paymentMethods.map((method) => ({
            ...method,
            isDefault: newPaymentMethodId === method.id,
        }));

        setCustomer({
            ...customer,
            paymentMethods: newPaymentMethods,
        });
    };

    const handleChargeMoney = async (amount: number): Promise<boolean> => {
        const res = await chargeMoneyToWallet(customer.id, amount);

        if (res.status === 200) {
            setCustomer({
                ...customer,
                wallet: {
                    ...customer.wallet,
                    //@ts-ignore
                    balance: parseFloat(customer.wallet.balance ?? "0") + parseFloat(amount),
                },
            });
            enqueueSnackbar("Dinero cargado correctamente", { variant: "success" });
            return true;
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al cargar el dinero", { variant: "error" });
            return false;
        }
    };

    const { container, breadcrumbs, active } = useStyles();

    var currentCustomerInfo = <></>;

    switch (true) {
        case breadcrumb === "subscriptions":
            currentCustomerInfo = (
                <CustomerSubscriptionsTable subscriptions={customer.subscriptions} plans={props.plans} customerId={customer.id} />
            );
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
                    handleUpdateWallet={handleUpdateWallet}
                    handleCreateWallet={handleCreateWallet}
                    customer={customer}
                    setCustomer={setCustomer}
                    handleChargeMoney={handleChargeMoney}
                />
            );
            break;

        case breadcrumb === "events":
            currentCustomerInfo = <CustomerEvents events={customer.events} />;
            break;

        default:
            currentCustomerInfo = (
                <CustomerSubscriptionsTable subscriptions={customer.subscriptions} plans={props.plans} customerId={customer.id} />
            );
    }

    return (
        <>
            <DashboardWithBackTitle title={`Perfil de ${customer.fullName}`} />
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

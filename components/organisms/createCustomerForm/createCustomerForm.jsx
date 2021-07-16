// Utils & Config
import React, { useState } from "react";
import { useRouter } from "next/router";
import { createCustomer } from "../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";

// External components
import { Box, Container } from "@material-ui/core";

// Internal components
import PersonalData from "./personalData";
import AccountData from "./accountData";
import DeliveryData from "./deliveryData";
import BillingData from "./billingData";
import BackAndCreateButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";

const CreateCustomerForm = (props) => {
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        phone1: "",
        phone2: "",
        bornDate: new Date(),
        preferredLanguage: "",
        // Delivery
        deliveryAddress: "",
        deliveryClarifications: "",
        deliveryPreferredSchedule: "",
        // Billing
        billingAddress: "",
        billingClarifications: "",
        billingName: "",
        billingPersonalIdNumber: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        // const res = await createCustomer(formData);
        const res = { status: 200 };

        if (res.status === 200) {
            enqueueSnackbar("Se ha creado el usuario correctamente", {
                variant: "success",
            });

            router.push("/gestion-de-clientes");
        } else {
            enqueueSnackbar("No se ha podido crear el usuario", {
                variant: "error",
            });
        }
    };

    console.log(formData);

    return (
        <Container>
            <Box>
                <PersonalData formData={formData} handleChange={handleChange} />
                <AccountData formData={formData} handleChange={handleChange} />
                <DeliveryData formData={formData} handleChange={handleChange} />
                <BillingData formData={formData} handleChange={handleChange} />
            </Box>

            <Box>
                <BackAndCreateButtons
                    createButtonText="Crear cliente"
                    backButtonHandler={() => router.push("/gestion-de-clientes")}
                    createButtonHandler={handleSubmit}
                />
            </Box>
        </Container>
    );
};

export default CreateCustomerForm;

CreateCustomerForm.propTypes = {};

// Utils & Config
import React, { useState } from "react";
import { useRouter } from "next/router";

// External components
import { Box, Grid, Container } from "@material-ui/core";

// Internal components
import PersonalData from "./personalData";
import AccountData from "./accountData";
import DeliveryData from "./deliveryData";
import BillingData from "./billingData";
import BackAndCreateButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";

const CreateCustomerForm = (props) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
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

    console.log(formData)

    return (
        <>
            <PersonalData formData={formData} handleChange={handleChange} />
            <AccountData formData={formData} handleChange={handleChange} />
            <DeliveryData formData={formData} handleChange={handleChange} />
            <BillingData formData={formData} handleChange={handleChange} />

            <BackAndCreateButtons
                createButtonText="Crear cliente"
                backButtonHandler={() => router.push("/gestion-de-clientes")}
                createButtonHandler={() => alert("Usuario creado")}
            />
        </>
    );
};

export default CreateCustomerForm;

CreateCustomerForm.propTypes = {};

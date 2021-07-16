// Utils & Config
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

// Helpers
import { createCustomer } from "../../../helpers/serverRequests/customer";
import { getGeometry } from "../../../helpers/geocode/geocode";

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
        deliveryLatitude: "",
        deliveryLongitude: "",
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

    const handleGoogleInput = async (address) => {
        const geometry = await getGeometry(address.structured_formatting.main_text);
        console.log("address:", address)
        setFormData({
            ...formData,
            deliveryAddress: address.description,
            deliveryLatitude: geometry.lat,
            deliveryLongitude: geometry.lng,
        });
    };

    console.log("formdata:", formData)

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

    return (
        <Container>
            <Box>
                {/* <PersonalData formData={formData} handleChange={handleChange} /> */}
                {/* <AccountData formData={formData} handleChange={handleChange} /> */}
                <DeliveryData formData={formData} handleChange={handleChange} handleGoogleInput={handleGoogleInput} />
                {/* <BillingData formData={formData} handleChange={handleChange} /> */}
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

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
import { getFormattedAddressFromGoogle, OtherAddressInformation } from "helpers/utils/utils";

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
        deliveryAddress: "",
        latShipping: "",
        longShipping: "",
        deliveryClarifications: "",
        deliveryPreferredSchedule: "",
        billingAddress: "",
        latBilling: "",
        longBilling: "",
        billingClarifications: "",
        billingName: "",
        billingPersonalIdNumber: "",
        shippingCity: "",
        shippingCountry: "",
        shippingProvince: "",
        shippingPostalCode: "",
        billingCity: "",
        billingCountry: "",
        billingProvince: "",
        billingPostalCode: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleGoogleDeliveryInput = async (address) => {
        const response = await getGeometry(address.description);
        const moreAddresInformation: OtherAddressInformation = getFormattedAddressFromGoogle(response.results[0]?.address_components);

        setFormData({
            ...formData,
            deliveryAddress: address.description,
            latShipping: response.results[0].geometry.location.lat,
            longShipping: response.results[0].geometry.location.lng,
            shippingCity: moreAddresInformation.city,
            shippingProvince: moreAddresInformation.province,
            shippingCountry: moreAddresInformation.country,
            shippingPostalCode: moreAddresInformation.postalCode,
        });
    };

    const handleGoogleBillingInput = async (address) => {
        const response = await getGeometry(address.description);
        const moreAddresInformation: OtherAddressInformation = getFormattedAddressFromGoogle(response.results[0]?.address_components);

        setFormData({
            ...formData,
            billingAddress: address.description,
            latBilling: response.results[0].geometry.location.lat,
            longBilling: response.results[0].geometry.location.lng,
            billingCity: moreAddresInformation.city,
            billingProvince: moreAddresInformation.province,
            billingCountry: moreAddresInformation.country,
            billingPostalCode: moreAddresInformation.postalCode,
        });
    };

    const handleSubmit = async () => {
        console.log("FOrm data: ", formData);
        const res = await createCustomer(formData);
        // const res = { status: 200 };
        console.log(res);

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
                <PersonalData formData={formData} handleChange={handleChange} />
                <AccountData formData={formData} handleChange={handleChange} />
                <DeliveryData formData={formData} handleChange={handleChange} handleGoogleInput={handleGoogleDeliveryInput} />
                <BillingData formData={formData} handleChange={handleChange} handleGoogleInput={handleGoogleBillingInput} />
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

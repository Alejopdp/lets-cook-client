// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../../../atoms/input/input";

const BillingDataModal = (props) => {
    const [formData, setFormData] = useState({
        address: props.customer.address || "",
        clarifications: props.customer.clarifications || "",
        name: props.customer.name || "",
        personalIdNumber: props.customer.personalIdNumber || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    console.log(props.customer)

    return (
        <>
            <Input
                name="address"
                label="Dirección de facturación"
                value={formData.address}
                handleChange={handleChange}
            />

            <Input
                name="clarifications"
                label="Aclaraciones"
                value={formData.clarifications}
                handleChange={handleChange}
            />

            <Input
                name="name"
                label="Nombre"
                value={formData.name}
                handleChange={handleChange}
            />

            <Input
                name="personalIdNumber"
                label="DNI / NIE / CIF"
                value={formData.personalIdNumber}
                handleChange={handleChange}
            />

        </>
    );
};

export default BillingDataModal;

BillingDataModal.propTypes = {

};

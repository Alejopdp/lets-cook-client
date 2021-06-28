// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../../../atoms/input/input";

const BillingDataModal = (props) => {
    return (
        <>
            <Input
                name="address"
                label="Dirección de facturación"
                value={props.formData.address}
                handleChange={props.handleChange}
            />

            <Input
                name="clarifications"
                label="Aclaraciones"
                value={props.formData.clarifications}
                handleChange={props.handleChange}
            />

            <Input
                name="name"
                label="Nombre"
                value={props.formData.name}
                handleChange={props.handleChange}
            />

            <Input
                name="personalIdNumber"
                label="DNI / NIE / CIF"
                value={props.formData.personalIdNumber}
                handleChange={props.handleChange}
            />

        </>
    );
};

export default BillingDataModal;

BillingDataModal.propTypes = {

};

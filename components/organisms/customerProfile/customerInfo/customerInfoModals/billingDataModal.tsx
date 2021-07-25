// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../../../atoms/input/input";
import LocationSearchInput from "components/atoms/locationSearchInput/locationSearchInput";
import { BillingDataModalProps } from "../../interface";

const BillingDataModal = (props: BillingDataModalProps) => {
    return (
        <>
            <LocationSearchInput name="name" handleChange={props.handleGoogleInput} value={props.formData.addressName} />

            <Input name="details" label="Aclaraciones" value={props.formData.details} handleChange={props.handleChange} />

            <Input name="customerName" label="Nombre" value={props.formData.customerName} handleChange={props.handleChange} />

            <Input name="identification" label="DNI / NIE / CIF" value={props.formData.identification} handleChange={props.handleChange} />
        </>
    );
};

export default BillingDataModal;

BillingDataModal.propTypes = {};

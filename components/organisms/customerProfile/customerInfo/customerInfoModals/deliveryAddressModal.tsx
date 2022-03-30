// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../../../atoms/input/input";
import SelectInput from "../../../../atoms/selectInput/SelectInput";
import LocationSearchInput from "components/atoms/locationSearchInput/locationSearchInput";
import { DeliveryAddressModalProps } from "../../interface";

const DeliveryAddressModal = (props: DeliveryAddressModalProps) => {
    const scheduleOptions = [
        {
            value: "15 - 18",
            label: "De 15 a 18",
        },
        {
            value: "17 - 20",
            label: "De 17 a 20",
        },
        {
            value: "19 - 22",
            label: "De 19 a 22",
        },
    ];

    return (
        <>
            <LocationSearchInput
                disabled={false}
                name="addressName"
                handleChange={props.handleGoogleInput}
                value={props.formData.addressName}
            />
            <Input name="addressDetails" label="Aclaraciones" value={props.formData.addressDetails} handleChange={props.handleChange} />
            <SelectInput
                name="preferredShippingHour"
                label="Horario de preferencia de entrega"
                value={props.formData.preferredShippingHour}
                handleChange={props.handleChange}
                options={scheduleOptions}
            />
        </>
    );
};

export default DeliveryAddressModal;

DeliveryAddressModal.propTypes = {};

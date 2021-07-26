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
            value: "De 16 a 20",
            label: "De 8 a 12",
        },
        {
            value: "De 16 a 20",
            label: "De 12 a 16",
        },
        {
            value: "De 16 a 20",
            label: "De 16 a 20",
        },
    ];

    return (
        <>
            <LocationSearchInput name="name" handleChange={props.handleGoogleInput} value={props.formData.name} />
            <Input name="details" label="Aclaraciones" value={props.formData.details} handleChange={props.handleChange} />
            <SelectInput
                name="preferredSchedule"
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

// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../../../atoms/input/input";
import SelectInput from "../../../../atoms/selectInput/SelectInput";

const DeliveryAddressModal = (props) => {
    const [formData, setFormData] = useState({
        deliveryAddress: props.customer.address || "",
        clarifications: props.customer.clarifications || "",
        preferredSchedule: props.customer.preferredSchedule.value || "",
    })

    const scheduleOptions = [
        {
            value: '1',
            label: 'De 8 a 12',
        },
        {
            value: '2',
            label: 'De 12 a 16',
        },
        {
            value: '3',
            label: 'De 16 a 20',
        },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <>
            <Input
                name="address"
                label="Dirección de entrega"
                value={formData.deliveryAddress}
                handleChange={handleChange}
            />

            <Input
                name="clarifications"
                label="Aclaraciones"
                value={formData.clarifications}
                handleChange={handleChange}
            />

            <SelectInput
                name="preferredSchedule"
                label="Horario de preferencia de entrega"
                value={formData.preferredSchedule}
                handleChange={handleChange}
                options={scheduleOptions}
            />

        </>
    );
};

export default DeliveryAddressModal;

DeliveryAddressModal.propTypes = {

};

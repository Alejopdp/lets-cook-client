// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../../../atoms/input/input";
import SelectInput from "../../../../atoms/selectInput/SelectInput";

const DeliveryAddressModal = (props) => {
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

    return (
        <>
            <Input
                name="address"
                label="Dirección de entrega"
                value={props.formData.address}
                handleChange={props.handleChange}
            />

            <Input
                name="clarifications"
                label="Aclaraciones"
                value={props.formData.clarifications}
                handleChange={props.handleChange}
            />

            <SelectInput
                name="preferredSchedule"
                label="Horario de preferencia de entrega"
                value={props.formData.preferredSchedule}
                handleChange={props.handleChange}
                options={scheduleOptions}
            />

        </>
    );
};

export default DeliveryAddressModal;

DeliveryAddressModal.propTypes = {

};

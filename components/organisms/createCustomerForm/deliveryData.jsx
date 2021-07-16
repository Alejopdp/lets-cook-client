// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../atoms/input/input";
import SelectInput from "../../atoms/selectInput/SelectInput";
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import LocationSearchInput from "../../atoms/locationSearchInput/locationSearchInput";

const DeliveryData = (props) => {
    const scheduleOptions = [
        {
            value: "1",
            label: "De 8 a 12",
        },
        {
            value: "2",
            label: "De 12 a 16",
        },
        {
            value: "3",
            label: "De 16 a 20",
        },
    ];

    return (
        <PaperWithTitleContainer width="70%" title="Dirección de entrega" marginBottom="16px">
            {/* <Input
                name="deliveryAddress"
                label="Dirección de entrega"
                value={props.formData.deliveryAddress}
                handleChange={props.handleChange}
            /> */}
            <LocationSearchInput
                name="deliveryAddress"
                label="Dirección de entrega"
                value={props.formData.deliveryAddress}
                handleChange={props.handleChange}
            />

            <Input
                name="deliveryClarifications"
                label="Piso / Puerta / Aclaraciones"
                value={props.formData.deliveryClarifications}
                handleChange={props.handleChange}
            />

            <SelectInput
                name="deliveryPreferredSchedule"
                label="Horario de preferencia de entrega"
                value={props.formData.deliveryPreferredSchedule}
                handleChange={props.handleChange}
                options={scheduleOptions}
            />
        </PaperWithTitleContainer>
    );
};

export default DeliveryData;

DeliveryData.propTypes = {};

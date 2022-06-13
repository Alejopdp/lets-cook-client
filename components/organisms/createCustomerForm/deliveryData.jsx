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
        <PaperWithTitleContainer width="70%" title="Dirección de entrega" marginBottom="16px">
            <LocationSearchInput
                name="deliveryAddress"
                label="Dirección de entrega"
                value={props.formData.deliveryAddress}
                handleChange={props.handleGoogleInput}
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

// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// Internal components
import Input from "../../atoms/input/input";
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";

const BillingData = (props) => {
    return (
        <PaperWithTitleContainer width="70%" title="Dirección de facturación">
            <Input
                name="billingAddress"
                label="Dirección de facturación"
                value={props.formData.billingAddress}
                handleChange={props.handleChange}
            />

            <Input
                name="billingClarifications"
                label="Piso / Puerta / Aclaraciones"
                value={props.formData.billingClarifications}
                handleChange={props.handleChange}
            />

            <Input
                name="billingName"
                label="Nombre"
                value={props.formData.billingName}
                handleChange={props.handleChange}
            />

            <Input
                name="billingPersonalIdNumber"
                label="DNI / NIE / CIF"
                value={props.formData.billingPersonalIdNumber}
                handleChange={props.handleChange}
            />

        </PaperWithTitleContainer>
    );
};

export default BillingData;

BillingData.propTypes = {

};

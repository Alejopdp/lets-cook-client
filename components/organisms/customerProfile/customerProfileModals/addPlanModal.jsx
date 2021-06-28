// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// Internal components
import SelectInput from "../../../atoms/selectInput/SelectInput";

const AddPlanModal = (props) => {
    const planOptions = [
        {
            value: '1',
            label: 'Plan 1',
        },
        {
            value: '2',
            label: 'Plan 2',
        },
        {
            value: '3',
            label: 'Plan 3',
        },
    ];

    const variantOptions = [
        {
            value: '1',
            label: 'Variante 1',
        },
        {
            value: '2',
            label: 'Variante 2',
        },
        {
            value: '3',
            label: 'Variante 3',
        },
    ];

    return (
        <>
            <SelectInput
                name="plans"
                label="Plan"
                value={props.formData.plan}
                handleChange={props.handleChange}
                options={planOptions}
            />

            <SelectInput
                name="variants"
                label="Variante"
                value={props.formData.variant}
                handleChange={props.handleChange}
                options={variantOptions}
            />

        </>
    );
};

export default AddPlanModal;

AddPlanModal.propTypes = {

};

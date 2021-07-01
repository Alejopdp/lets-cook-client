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

    const [plans, setPlans] = useState(props.plans);
    const [selectedPlan, setSelectedPlan] = useState({});

    const plansNames = plans.map((plan, index) => (plan.name))

    return (
        <>
            <SelectInput
                name="plans"
                label="Plan"
                value={selectedPlan}
                handleChange={() => setSelectedPlan(selectedPlan)}
                items={plansNames}
            />



            {/* <SelectInput
                name="variants"
                label="Variante"
                value={props.formData.variant}
                handleChange={props.handleChange}
                items={variantOptions}
            /> */}

        </>
    );
};

export default AddPlanModal;

AddPlanModal.propTypes = {

};

// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").createPlan;

// External components

// Internal components
import CreatePlanForm from "./createPlanForm/createPlanForm";
import DashboardTitle from "../../layout/dashboardTitleWithBackButton/";

const CreatePlan = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    const goBackHandler = () => {
        router.replace("/planes", "/planes", { locale: router.locale });
    };

    return (
        <>
            <DashboardTitle title={lang.title} handleClick={goBackHandler} />
            <CreatePlanForm additionalPlans={props.additionalPlans} />
        </>
    );
};

CreatePlan.propTypes = {
    additionalPlans: PropTypes.array.isRequired,
};

export default CreatePlan;

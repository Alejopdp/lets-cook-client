// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").updatePlan;

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal compontents
import DashboardTitleWithBackButtonAndLanguageSelector from "../../layout/dashboardTitleWithBackButtonAndLanguageSelector";
import UpdatePlanForm from "../updatePlan/updatePlanForm/updateForm";
import LanguageButton from "../../molecules/languageButton/languageButton";

const UpdatePlan = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    const handleChangeLanguage = (language) => {
        router.replace({ pathname: router.pathname, query: router.query }, router.asPath, { locale: language.value });
    };

    const goBackHandler = () => {
        router.replace("/planes", "/planes", { locale: router.locale });
    };

    return (
        <>
            <DashboardTitleWithBackButtonAndLanguageSelector title={lang.title} handleClick={goBackHandler} handleChangeLanguage={handleChangeLanguage} />
            <UpdatePlanForm additionalPlans={props.additionalPlans} plan={props.plan} />
        </>
    );
};

UpdatePlan.propTypes = {
    plan: PropTypes.any.isRequired,
    additionalPlans: PropTypes.array.isRequired,
};

export default UpdatePlan;

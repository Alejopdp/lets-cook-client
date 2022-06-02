// Utils & config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").updatePlan;

// Internal compontents
import DashboardTitleWithBackButtonAndLanguageSelector from "../../layout/dashboardTitleWithBackButtonAndLanguageSelector";
import UpdatePlanForm from "../updatePlan/updatePlanForm/updateForm";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const UpdatePlan = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];
    const { userInfo } = useUserInfoStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.UPDATE_PLAN)) router.back();

        setIsLoading(false);
    }, [userInfo]);

    const handleChangeLanguage = (language) => {
        router.replace({ pathname: router.pathname, query: router.query }, router.asPath, { locale: language.value });
    };

    const goBackHandler = () => {
        router.replace("/planes", "/planes", { locale: router.locale });
    };

    return (
        <>
            <DashboardTitleWithBackButtonAndLanguageSelector
                title={lang.title}
                handleClick={goBackHandler}
                handleChangeLanguage={handleChangeLanguage}
            />
            {!isLoading && <UpdatePlanForm additionalPlans={props.additionalPlans} plan={props.plan} />}
        </>
    );
};

UpdatePlan.propTypes = {
    plan: PropTypes.any.isRequired,
    additionalPlans: PropTypes.array.isRequired,
};

export default UpdatePlan;

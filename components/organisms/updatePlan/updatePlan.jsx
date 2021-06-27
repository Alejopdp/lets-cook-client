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
import DasbhoardTitle from "../../layout/dashboardTitleWithBackButton";
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
        <Container maxWidth="lg" style={{ margin: "auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <DasbhoardTitle title={lang.title} handleClick={goBackHandler} />
                        <LanguageButton handleSelectOption={handleChangeLanguage} />
                    </Box>
                </Grid>
                <UpdatePlanForm additionalPlans={props.additionalPlans} plan={props.plan} />
            </Grid>
        </Container>
    );
};

UpdatePlan.propTypes = {
    plan: PropTypes.any.isRequired,
    additionalPlans: PropTypes.array.isRequired,
};

export default UpdatePlan;

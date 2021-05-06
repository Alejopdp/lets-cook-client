// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").createPlan;

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components
import CreatePlanForm from "./createPlanForm/createPlanForm";
import DasbhoardTitle from "../../layout/dashboardTitleWithBackButton/";

const CreatePlan = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Container maxWidth="lg" style={{ margin: "auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DasbhoardTitle title={lang.title} />
                </Grid>
                <CreatePlanForm additionalPlans={props.additionalPlans} />
            </Grid>
        </Container>
    );
};

CreatePlan.propTypes = {
    additionalPlans: PropTypes.array.isRequired,
};

export default CreatePlan;

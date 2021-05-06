// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").updatePlan;

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal compontents
import DasbhoardTitle from "../../layout/dashboardTitleWithBackButton";
import UpdatePlanForm from "../updatePlan/updatePlanForm/updateForm";

const UpdatePlan = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Container maxWidth="lg" style={{ margin: "auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DasbhoardTitle title={lang.title} />
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

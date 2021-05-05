// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal compontents
import UpdatePlanForm from "../updatePlan/updatePlanForm/updateForm";

const UpdatePlan = (props) => {
    return (
        <Container maxWidth="md" style={{ margin: "auto" }}>
            <UpdatePlanForm additionalPlans={props.additionalPlans} plan={props.plan} />
        </Container>
    );
};

UpdatePlan.propTypes = {
    plan: PropTypes.any.isRequired,
    additionalPlans: PropTypes.array.isRequired,
};

export default UpdatePlan;

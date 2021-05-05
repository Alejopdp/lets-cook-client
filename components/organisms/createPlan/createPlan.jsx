// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import CreatePlanForm from "./createPlanForm/createPlanForm";

const CreatePlan = (props) => {
    return (
        <Container maxWidth="md" style={{ margin: "auto" }}>
            <CreatePlanForm additionalPlans={props.additionalPlans} />
        </Container>
    );
};

CreatePlan.propTypes = {
    additionalPlans: PropTypes.array.isRequired,
};

export default CreatePlan;

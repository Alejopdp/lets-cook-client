// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import PlanCard from "../../molecules/planCard/planCard";

const PlansGrid = (props) => {
    return (
        <Grid item container spacing={2}>
            {props.plans.map((plan, index) => (
                <Grid item xs={3}>
                    <PlanCard key={index} item={plan} />
                </Grid>
            ))}
        </Grid>
    );
};

PlansGrid.propTypes = {
    plans: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            shortDescription: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
            sku: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ),
};

export default PlansGrid;

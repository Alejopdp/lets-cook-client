// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import PlanCard from "../../molecules/planCard/planCard";

const PlansGrid = (props) => {
    const router = useRouter();

    return (
        <Grid item container spacing={2}>
            {props.plans.map((plan, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <PlanCard
                        item={plan}
                        handlerSwitch={() => props.handleToggleState(plan)}
                        handlerDelete={() => props.handleDelete(plan)}
                        handlerEdit={() => router.push({ pathname: "/planes/modificar", query: { id: plan.id } })}
                    />
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
            imageUrl: PropTypes.string.isRequired,
        })
    ),
    handleToggleState: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default PlansGrid;

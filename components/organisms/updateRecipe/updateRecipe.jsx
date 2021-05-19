// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import UpdateRecipeForm from "../updateRecipe/updateRecipeForm/updateRecipeForm";

const UpdateRecipe = (props) => {
    return (
        <Container maxWidth="lg" style={{ margin: "auto" }}>
            <UpdateRecipeForm formData={props.formData} recipeData={props.recipeData} />
        </Container>
    );
};

UpdateRecipe.propTypes = {};

export default UpdateRecipe;

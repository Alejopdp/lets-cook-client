// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import CreateRecipeForm from "../../molecules/recipeForm/recipeForm";

const CreateRecipe = (props) => {
    return (
        <Container maxWidth="lg" style={{ margin: "auto" }}>
            <CreateRecipeForm formData={props.formData} recipeData={props.recipeData} />
        </Container>
    );
};

CreateRecipe.propTypes = {};

export default CreateRecipe;

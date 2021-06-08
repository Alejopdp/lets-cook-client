// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import UpdateRecipeForm from "../updateRecipe/updateRecipeForm/updateRecipeForm";
import DashboardTitle from "../../layout/dashboardTitleWithBackButton/";

const UpdateRecipe = (props) => {
    const goBackHandler = () => {
        router.replace("/recetas", "/recetas", { locale: router.locale });
    };
    return (
        <Container maxWidth="lg" style={{ margin: "auto" }}>
            {/* <DashboardTitle title={"Modificar receta"} handleClick={goBackHandler} /> */}

            <UpdateRecipeForm formData={props.formData} recipeData={props.recipeData} />
        </Container>
    );
};

UpdateRecipe.propTypes = {};

export default UpdateRecipe;

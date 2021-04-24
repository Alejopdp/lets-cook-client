import React from "react";
import { makeStyles } from "@material-ui/core";
import { RecipesList } from "../../components/recipesList";
import LayoutFixedSidebar from '../../components/layout/layoutFixedSidebar/layoutFixedSidebar'

const RecipesPage = () => {
  return (
    <LayoutFixedSidebar>
        <RecipesList />
    </LayoutFixedSidebar>
  );
};

export default RecipesPage;

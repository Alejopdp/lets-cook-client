import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { RecipesList } from "../../components/recipesList";
import LayoutFixedSidebar from '../../components/layout/layoutFixedSidebar/layoutFixedSidebar'

const useStyles = makeStyles((theme) => ({
  root: {
      paddingTop: theme.spacing(10),
      paddingRight: theme.spacing(8),
      paddingLeft: theme.spacing(8),
  }
}));
const RecipesPage = () => {
  const classes = useStyles();
  return (
    <LayoutFixedSidebar>
      <Box width="100%" height="100vh" className={classes.root}>
        <RecipesList />
      </Box>
    </LayoutFixedSidebar>
  );
};

export default RecipesPage;

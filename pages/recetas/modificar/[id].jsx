import { Box, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import LayoutFixedSidebar from "../../../components/layout/layoutFixedSidebar/layoutFixedSidebar";

import Form from "../../../components/recipeForm/recipeForm";
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },
}));

const RecipeForm = () => {
    const classes = useStyles();
    const router = useRouter();
    console.log('***-> Router', router.query);

    return (
        <LayoutFixedSidebar>
            <Box width="100%" height="100vh" className={classes.root}>
                <Form></Form>
            </Box>
        </LayoutFixedSidebar>
    );
};
export async function getServerSideProps(context) {
    return { props: {} };
}
export default RecipeForm;

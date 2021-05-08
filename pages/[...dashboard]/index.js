// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { pagesPropsGetter } from "../../helpers/pagesPropsGetter/pagesPropsGetter";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";

// External components
import { Box, makeStyles, Typography } from "@material-ui/core";

// Internal components
import LayoutFixedSidebar from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import RecipesList from "../../components/recipesList";
import UsersDashboard from "../../components/organisms/usersDashboard/usersDashboard";
import PlansDashboard from "../../components/organisms/plansDashboard/plansDashboard";
import CreatePlan from "../../components/organisms/createPlan/createPlan";
import CreateUserDashboard from "../../components/organisms/createUserDashboard/createUserDashboard";
import UpdateUserDashboard from "../../components/organisms/updateUserDashboard";
import UpdatePlan from "../../components/organisms/updatePlan/updatePlan";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(8),
        paddingLeft: theme.spacing(8),
    },
    backBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "",
        paddingLeft: theme.spacing(35),
        paddingTop: theme.spacing(10),
        "@media (max-width: 780px)": {
            border: "1px solid red",
            paddingLeft: theme.spacing(0),
        },
    },
}));

const Index = (props) => {
    const route = useRouter();
    const classes = useStyles();

    const getSectionComponent = (path) => {
        /* TODO: IMPORTANT!!! 
            optimize the cases for return componet dynamically
        **/

        if (!!props.error) {
            return (
                <Box width="100%" height="100vh" className={classes.root}>
                    <Typography variant="h1">No yet / show here 404 page</Typography>
                </Box>
            );
        }

        switch (path) {
            case "recetas":
                return (
                    <Box width="100%" height="100vh" className={classes.root}>
                        <RecipesList lang={props.langs} />
                    </Box>
                );

            case "gestion-de-usuarios":
                return <UsersDashboard users={props.users} />;

            case "gestion-de-usuarios/crear":
                return <CreateUserDashboard roles={props.roles} />;

            case "gestion-de-usuarios/modificar":
                return <UpdateUserDashboard roles={props.roles} user={props.user} />;

            case "planes":
                return <PlansDashboard plans={props.plans} />;

            case "planes/crear":
                return <CreatePlan additionalPlans={props.additionalPlans} />;

            case "planes/modificar":
                return <UpdatePlan additionalPlans={props.additionalPlans} plan={props.plan} />;

            default:
                return (
                    <Box width="100%" height="100vh" className={classes.root}>
                        <Typography variant="h1">No yet / show here 404 page</Typography>
                    </Box>
                );
        }
    };
    return (
        <SnackbarProvider maxSnack={3}>
            <LayoutFixedSidebar lang={props.langs}>{getSectionComponent(route.query.dashboard.join("/"))}</LayoutFixedSidebar>
        </SnackbarProvider>
    );
};

Index.propTypes = {};

export async function getServerSideProps(context) {
    const langs = require("../../lang");
    const props = await pagesPropsGetter(context.query, context.locale);

    return {
        props: { ...props, langs: { ...langs } },
    };
}

export default Index;

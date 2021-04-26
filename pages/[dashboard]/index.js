// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Box, makeStyles, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LayoutFixedSidebar from "../../components/layout/layoutFixedSidebar/layoutFixedSidebar";
import RecipesList from "../../components/recipesList";
import CreateUser from "../../components/createUser";

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
        switch (path) {
            case "recetas":
                return (
                    <Box width="100%" height="100vh" className={classes.root}>
                        <RecipesList lang={props.langs} />
                    </Box>
                );
            case "gestion-de-usuarios":
                return (
                    <>
                        <div className={classes.backBtn}>
                            <ArrowBackIcon />
                            <Typography variant="h5">Crear usuario</Typography>
                        </div>
                        <CreateUser lang={props.langs} />
                    </>
                );
            default:
                return (
                    <Box width="100%" height="100vh" className={classes.root}>
                        <Typography variant="h1">No yet / show here 404 page</Typography>
                    </Box>
                );
        }
    };
    return <LayoutFixedSidebar lang={props.langs}>{getSectionComponent(route.query.dashboard)}</LayoutFixedSidebar>;
};

Index.propTypes = {};

export async function getServerSideProps(context) {
    const langs = require("../../lang");
    return {
        props: { langs: {...langs} },
    };
}

export default Index;

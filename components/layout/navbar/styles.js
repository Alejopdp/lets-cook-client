import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        display: "flex",
        justifyContent: "space-between",
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.background.paper,
        width: "100vw",
        boxShadow: "none",
    },

    menuButton: {
        marginRight: 36,
    },

    menuButtonHidden: {
        display: "none",
    },
}));

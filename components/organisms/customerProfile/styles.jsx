import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
            textAlign: "center"
        },
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            textAlign: "center"
        },
        marginBottom: theme.spacing(2)
    },
    breadcrumbs: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        cursor: "pointer",
        textTransform: "uppercase",
    },
    active: {
        color: theme.palette.primary.main,
        paddingBottom: '4px',
        borderBottom: `3px solid ${theme.palette.primary.main}`
    }
}));

export default useStyles;
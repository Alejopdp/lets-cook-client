import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
    },
    breadcrumbs: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        cursor: "pointer",
        textTransform: "uppercase",
    },
    active: {
        color: theme.palette.primary.main,
        borderBottom: `4px solid ${theme.palette.primary.main}`
    }
}));

export default useStyles;
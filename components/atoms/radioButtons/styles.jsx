import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles( theme => ({
    spacing: {
        paddingTop: theme.spacing(1)
    },
    subtitle: {
        paddingLeft: theme.spacing(4)
    }
}));

export default useStyles;
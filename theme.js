import { createMuiTheme } from "@material-ui/core/styles";
import colors from "./styles/colors.module.scss";
import fonts from "./styles/fonts.module.scss";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.primaryColor,
        },
        secondary: {
            main: colors.secondaryColor,
        },
        background: {
            default: colors.backgroundSecondaryColor,
            paper: colors.backgroundPrimaryColor,
        },
        text: {
            primary: colors.titleColor,
            secondary: colors.paragraphColor,
        },
    },

    typography: {
        h1: { fontFamily: fonts.titleFont, fontWeight: 800 },
        h2: { fontFamily: fonts.titleFont, fontWeight: 700 },
        h3: { fontFamily: fonts.titleFont, fontWeight: 700 },
        h4: { fontFamily: fonts.titleFont, fontWeight: 700 },
        h5: { fontFamily: fonts.titleFont, fontWeight: 700 },
        h6: { fontFamily: fonts.titleFont, fontWeight: 700 },
        subtitle1: { fontFamily: fonts.titleFont, fontWeight: 700 },
        subtitle2: { fontFamily: fonts.titleFont, fontWeight: 700 },
        body1: { fontFamily: fonts.paragraphFont, fontWeight: 400 },
        body2: { fontFamily: fonts.paragraphFont, fontWeight: 400 },
        button: { fontFamily: fonts.titleFont, fontWeight: 800 },
    },
});

export default theme;

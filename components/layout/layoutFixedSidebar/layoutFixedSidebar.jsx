// Utils & Config
import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getAdminOptions } from "../../../assets/sidebarOptions/adminOptions";

// External components
import Hidden from "@material-ui/core/Hidden";

// Internal components
import Navbar from "../navbar/navbar";
import FixedDrawer from "../drawers/fixedDrawer";
import MobileDrawer from "../drawers/mobileDrawer";
import DashboardContainer from "../dashboardContainer/dashboardContainer";
import { useUserInfoStore } from "stores/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
    appBarSpacer: theme.mixins.toolbar,
}));

export default function LayoutFixedSidebar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { userInfo } = useUserInfoStore();

    const sidebarOptions = useMemo(() => (Array.isArray(userInfo?.permissions) ? getAdminOptions(userInfo.permissions) : []), [userInfo]);

    const handleOpenDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar handleOpenDrawer={handleOpenDrawer} opened={open} />
            <Hidden smDown>
                <FixedDrawer sidebarOptions={sidebarOptions} />
            </Hidden>
            <Hidden mdUp>
                <MobileDrawer open={open} onClose={() => setOpen(false)} sidebarOptions={sidebarOptions} />
            </Hidden>
            <DashboardContainer>{props.children}</DashboardContainer>
        </div>
    );
}

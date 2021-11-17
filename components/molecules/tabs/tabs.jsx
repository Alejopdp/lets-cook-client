import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const theme = useTheme();

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box style={{ padding: `${theme.spacing(2)}px 12px` }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

const TabsGrouo = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Tabs
                value={props.value}
                onChange={props.handleChange}
                aria-label="ingredients tabs"
                scrollButtons="auto"
                variant="scrollable"
                style={{ marginBottom: theme.spacing(1) }}
            >
                {props.options.map((variant, index) => (
                    <Tab key={index} label={variant} {...a11yProps(index)} />
                ))}
            </Tabs>
            {props.content.map((list, index) => (
                <TabPanel value={props.value} index={index} id="tab-panel">
                    {list}
                </TabPanel>
            ))}
        </div>
    );
};

export default TabsGrouo;

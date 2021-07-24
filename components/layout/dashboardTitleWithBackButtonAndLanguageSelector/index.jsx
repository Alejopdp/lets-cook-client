// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTheme } from '@material-ui/core'

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import LanguageButton from "../../molecules/languageButton/languageButton";

// Images & icons
import ArrowBack from "@material-ui/icons/ArrowBack";

const DashboardTitleWithBackButtonAndLanguageSelector = (props) => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <Grid item xs={12} style={{ marginBottom: theme.spacing(4), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box display="inline-flex" alignItems="center" onClick={() => (props.handleClick ? props.handleClick() : router.back())} style={{ cursor: "pointer" }} >
                <Box display="flex" marginRight={1}>
                    <ArrowBack fontSize="default" />
                </Box>
                <Typography variant="h5">
                    {props.title}
                </Typography>
            </Box>
            <LanguageButton handleSelectOption={props.handleChangeLanguage}/>
        </Grid>
    );
};

DashboardTitleWithBackButtonAndLanguageSelector.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string.isRequired,
};

export default DashboardTitleWithBackButtonAndLanguageSelector;

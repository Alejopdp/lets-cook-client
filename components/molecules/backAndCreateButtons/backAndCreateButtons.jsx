// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from '@material-ui/core'
import { useRouter } from "next/router";

// External components
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

// Internal components
import CreateButton from "../../atoms/createButton/createButton";

const BackAndCreateButtons = (props) => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" style={{ marginTop: theme.spacing(4) }}>
            <Box marginRight={2}>
                <Button onClick={() => (props.backButtonHandler ? props.backButtonHandler() : router.back())} variant="text">
                    VOLVER
                </Button>
            </Box>
            <CreateButton onClick={props.createButtonHandler} disabled={props.isCreateButtonDisabled}>
                {props.createButtonText}
            </CreateButton>
        </Box>
    );
};

BackAndCreateButtons.propTypes = {
    createButtonText: PropTypes.string.isRequired,
    backButtonHandler: PropTypes.func.isRequired,
    createButtonHandler: PropTypes.func.isRequired,
    isCreateButtonDisabled: PropTypes.bool,
};

export default BackAndCreateButtons;

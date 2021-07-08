// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import IconButton from "@material-ui/core/IconButton";

// Icons & Images
import Delete from "@material-ui/icons/RemoveCircle";
import Enable from "@material-ui/icons/Check";

const EnabledOrDisabledIconButton = (props) => {
    return <IconButton onClick={props.onClick}>{props.enabled ? <Delete /> : <Enable />}</IconButton>;
};

EnabledOrDisabledIconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    enabled: PropTypes.bool.isRequired,
};

export default EnabledOrDisabledIconButton;

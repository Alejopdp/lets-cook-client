// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

// Internal components
import UserDropdown from "./userDropdown/userDropdown";

const UserBox = (props) => {
    const theme = useTheme();

    return (
        <Box display="flex">
            <Avatar sizes="sm" style={{ marginRight: theme.spacing(1) }} />
            <UserDropdown />
        </Box>
    );
};

UserBox.propTypes = {};

export default UserBox;

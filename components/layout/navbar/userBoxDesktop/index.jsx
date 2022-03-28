// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";
import { useUserInfoStore } from "../../../../stores/auth.tsx";

// External components
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

// Internal components
import UserDropdown from "./userDropdown/userDropdown";

const UserBox = (props) => {
    const theme = useTheme();
    const userInfo = useUserInfoStore((state) => state.userInfo);

    return (
        <Box display="flex">
            <Avatar sizes="sm" style={{ marginRight: theme.spacing(1) }}>
                {userInfo.firstName.slice(0, 2).toUpperCase()}
            </Avatar>
            <UserDropdown name={userInfo.firstName} />
        </Box>
    );
};

UserBox.propTypes = {};

export default UserBox;

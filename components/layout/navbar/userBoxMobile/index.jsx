// Utils & config
import React from "react";
import { useUserInfoStore } from "../../../../stores/auth.tsx";

// External components
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

// Internal components
import UserDropdown from "./userDropdown/userDropdown";

const UserBoxMobile = () => {
    const userInfo = useUserInfoStore((state) => state.userInfo);

    return (
        <Box display="flex">
            <Avatar sizes="sm">{userInfo.firstName.slice(0, 2).toUpperCase()}</Avatar>
            <UserDropdown />
        </Box>
    );
};

export default UserBoxMobile;

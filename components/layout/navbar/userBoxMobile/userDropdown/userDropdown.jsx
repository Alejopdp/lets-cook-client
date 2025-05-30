// Utils & config
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import cookies from "js-cookie";

// External components
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Icons & images
import Group from "@material-ui/icons/Group";
import ExitToApp from "@material-ui/icons/ExitToApp";
import useLocalStorage from "../../../../../hooks/useLocalStorage/localStorage";
import { useUserInfoStore } from "../../../../../stores/auth.tsx";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const UserDropdown = (props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const router = useRouter();
    const { resetLocalStorage } = useLocalStorage();
    const userInfo = useUserInfoStore((state) => state.userInfo);

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    };

    const handleSignOut = () => {
        resetLocalStorage();
        cookies.remove("token");
        router.push("/");
        setOpen(false);
    };

    const handleUsersDashboardClick = () => {
        router.push("/gestion-de-usuarios");
        setOpen(false);
    };

    return (
        <>
            <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                endIcon={<KeyboardArrowDown />}
                style={{ textTransform: "none" }}
            />
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleUsersDashboardClick}>
                                        <ListItemIcon>
                                            <Group />
                                        </ListItemIcon>
                                        <ListItemText>Gestión de usuarios</ListItemText>
                                    </MenuItem>
                                    <MenuItem onClick={handleSignOut}>
                                        <ListItemIcon>
                                            <ExitToApp />
                                        </ListItemIcon>
                                        <ListItemText>Cerrar sesión</ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

UserDropdown.propTypes = {
    name: PropTypes.string.isRequired,
};

export default UserDropdown;

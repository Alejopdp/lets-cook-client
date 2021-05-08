// Utils & config
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

// Internal components

// Icons
import Flag from "@material-ui/icons/Flag";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const LanguageButton = ({
    options = [
        { value: "es", label: "Español" },
        { value: "en", label: "English" },
    ],
    selected = { value: "es", label: "Español" },
    handleSelectOption = (option) => "",
}) => {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [selectedOption, setselectedOption] = useState(selected);
    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);

    React.useEffect(() => {
        setselectedOption(options.find((option) => option.value === router.locale));
    }, []);

    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const _handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const _handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    }

    const _handleSelectOption = (e, option) => {
        _handleClose(e);
        setselectedOption(option);
        handleSelectOption && handleSelectOption(option);
    };

    // return focus to the button when we transitioned from !open -> open

    return (
        <>
            <Button
                variant="contained"
                size="small"
                startIcon={<Flag />}
                endIcon={<KeyboardArrowDown />}
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={_handleToggle}
            >
                {selectedOption.label}
            </Button>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={_handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {options.map((item, key) => (
                                        <MenuItem key={key} onClick={(e) => _handleSelectOption(e, item)}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

LanguageButton.propTypes = {
    handleSelectOption: PropTypes.func.isRequired,
};

export default LanguageButton;

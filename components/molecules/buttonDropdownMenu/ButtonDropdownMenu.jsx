import React from "react";
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@material-ui/core";

import PropTypes from "prop-types";

const ButtonDropdownMenu = ({ label, options = [], handlerOnSelect, selected, children: Icon }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

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

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Button
                variant="contained"
                size="small"
                style={{backgroundColor:'white'}}
                startIcon={Icon}
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={_handleToggle}
            >
                {label}
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
                                        <MenuItem
                                            key={key}
                                            selected={item.code === selected}
                                            onClick={(e) => {
                                                _handleClose(e);
                                                handlerOnSelect && handlerOnSelect(item);
                                            }}
                                        >
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

ButtonDropdownMenu.propTypes = {
    handlerOnSelect: PropTypes.func,
    label: PropTypes.string,
    selected: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string,
            code: PropTypes.string,
        })
    ).isRequired,
};

export default ButtonDropdownMenu;

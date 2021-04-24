import React from "react";
import {
    Button,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from "@material-ui/core";
import { List as ListIcon } from "@material-ui/icons";

import PropTypes from "prop-types";

const SortDropdownMenu = ({ label, options, handlerOnSelect }) => {
    const _options = [
        {
            label: "Ordenar por nombre: A-Z",
            code: "sortByNameASC"
        }, 
        {
            label: "Ordenar por nombre: Z-A",
            code: "sortByNameDESC"
        }, 
        {
            label: "Fecha de publicación: ASC",
            code: "sortByDateASC"
        }, 
        {
            label: "Fecha de publicación: DESC",
            code: "sortByDateASC"
        },
    ];

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
                startIcon={<ListIcon></ListIcon>}
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
                                    {options &&
                                        options.map((item) => {
                                            <MenuItem
                                                onClick={(e) => {
                                                    _handleClose(e);
                                                    handlerOnSelect && handlerOnSelect(item.code);
                                                }}
                                            >
                                                item.label
                                            </MenuItem>;
                                        })}

                                    { !options &&
                                        _options.map((item) => 
                                            <MenuItem
                                                onClick={(e) => {
                                                    _handleClose(e);
                                                    handlerOnSelect && handlerOnSelect(item);
                                                }}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

SortDropdownMenu.propTypes = {
    handlerOnSelect: PropTypes.func,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string,
            code: PropTypes.string,
        })
    ),
};

export default SortDropdownMenu;

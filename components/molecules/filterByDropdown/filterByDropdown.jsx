import React from "react";
import PropTypes from "prop-types";
import { Button, Grow, Paper, Popper, Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox, makeStyles } from "@material-ui/core";
import { FilterList as FilterIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    paddingBotton1: {
        paddingBottom: theme.spacing(1),
    },
}));

const FilterByDropdown = ({ options = [], optionsSelected = [], handlerOnConfirm = () => {}, lang }) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [_optionsSelected, setOptionsSelected] = React.useState(optionsSelected);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleChecked = (itemFilter, checked) => {
        const index = _optionsSelected.findIndex(({code: _code}) => itemFilter.code === _code);
        if (checked) {
            if (index > -1) {
                return;
            }
            setOptionsSelected([..._optionsSelected, itemFilter]);
        } else {
            if (index < 0) {
                return;
            }
            const newOptions = [..._optionsSelected];
            newOptions.splice(index, 1);
            setOptionsSelected(newOptions);
        }
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
        setOptionsSelected(optionsSelected);
    }, [open, optionsSelected]);

    return (
        <>
            <Button
                variant="contained"
                size="small"
                startIcon={<FilterIcon></FilterIcon>}
                ref={anchorRef}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                FILTRAR
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <Box p={2}>
                                <Grid
                                    container
                                    spacing={1}
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                    alignContent="stretch"
                                    wrap="nowrap"
                                >
                                    {options.map((column) => (
                                        <Grid item direction="column" spacing={1}>
                                            <Grid item>
                                                <Typography className={classes.paddingBotton1} variant="subtitle2" color="initial">
                                                    {column.columnLabel}
                                                </Typography>
                                            </Grid>
                                            <Grid item container>
                                                <FormGroup autoFocusItem={open} row>
                                                    <Grid item container direction="column">
                                                        {column.items.map((item) => (
                                                            <Grid item xs>
                                                                <FormControlLabel
                                                                    autoFocusItem={open}
                                                                    control={
                                                                        <Checkbox
                                                                            onChange={(e) => handleChecked(item, e.target.checked)}
                                                                            name={item.code}
                                                                            color="primary"
                                                                            checked={_optionsSelected.some(({code}) => item.code === code)}
                                                                        />
                                                                    }
                                                                    label={item.label}
                                                                />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid justify="flex-end" container spacing={1}>
                                    <Grid item>
                                        <Button
                                            onClick={() => {
                                                setOptionsSelected(optionsSelected);
                                                handleToggle();
                                            }}
                                            color="default"
                                            label
                                        >
                                            {lang["buttonBack"]}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            onClick={() => {
                                                handlerOnConfirm(_optionsSelected);
                                                handleToggle();
                                            }}
                                            color="primary"
                                            label
                                        >
                                           {lang["buttonConfirm"]}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

FilterByDropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.exact({
            columnLabel: PropTypes.string,
            items: PropTypes.arrayOf(
                PropTypes.exact({
                    label: PropTypes.string,
                    code: PropTypes.string,
                })
            ),
        })
    ).isRequired,
    optionsSelected: PropTypes.arrayOf(PropTypes.string),
    handlerOnConfirm: PropTypes.func,
};

export default FilterByDropdown;

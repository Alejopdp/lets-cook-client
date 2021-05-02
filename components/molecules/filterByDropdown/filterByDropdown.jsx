import React from "react";
import PropTypes from "prop-types";
import { Button, Grow, Paper, Popper, Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox, makeStyles } from "@material-ui/core";
import { FilterList as FilterIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    paddingBotton1: {
        paddingBottom: theme.spacing(1),
    },
}));

const FilterByDropdown = ({ options = [], optionsSelected = [], handlerOnConfirm = () => {} }) => {
    const classes = useStyles();
    const [_optionsSelected, setOptionsSelected] = React.useState(optionsSelected);

    // const anchorRef = React.useRef(null);
    const [anchorRef, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorRef);
    const btnId = open ? "transitions-popper" : undefined;

    const handleToggle = (event) => {
        setAnchorEl(anchorRef ? null : event.currentTarget);
    };

    const handleChecked = (itemFilter, checked) => {
        const index = _optionsSelected.findIndex(({ id: _id }) => itemFilter.id === _id);
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

    const getCaption = (item) => {
        if (Boolean(item.label)) {
            return item.label;
        }
        if (Boolean(item.description)) {
            return item.description;
        }
        return "";
    };

    React.useEffect(() => {
        setOptionsSelected(optionsSelected);
    }, [optionsSelected]);

    return (
        <>
            <Button
                variant="contained"
                size="small"
                startIcon={<FilterIcon></FilterIcon>}
                aria-describedby={btnId}
                ref={anchorRef}
                onClick={handleToggle}
            >
                FILTRAR
            </Button>
            <Popper id={btnId} open={open} anchorEl={anchorRef} placement="bottom-start" transition>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <Box p={2}>
                                <Grid container spacing={1}>
                                    <Grid container spacing={1}>
                                        {options.map((column, key) => (
                                            <Grid item xs key={key} container direction="column" spacing={1}>
                                                <Grid item>
                                                    <Typography noWrap variant="subtitle2" color="initial">
                                                        {column.columnLabel}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container direction="column">
                                                    {column.items.map((item, key) => (
                                                        <Grid item key={key}>
                                                            <FormGroup row style={{ whiteSpace: "nowrap" }}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            onChange={(e) => handleChecked(item, e.target.checked)}
                                                                            name={item.id}
                                                                            color="primary"
                                                                            checked={_optionsSelected.some(({ id }) => item.id === id)}
                                                                        />
                                                                    }
                                                                    label={getCaption(item)}
                                                                />
                                                            </FormGroup>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid justify="flex-end" container spacing={1}>
                                        <Grid item>
                                            <Button
                                                onClick={(e) => {
                                                    setOptionsSelected(optionsSelected);
                                                    handleToggle(e);
                                                }}
                                                color="default"
                                            >
                                                VOLVER
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                onClick={(e) => {
                                                    handlerOnConfirm(_optionsSelected);
                                                    handleToggle(e);
                                                }}
                                                color="primary"
                                            >
                                                APLICAR FILTROS
                                            </Button>
                                        </Grid>
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
                    id: PropTypes.string,
                })
            ),
        })
    ).isRequired,
    optionsSelected: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string,
            id: PropTypes.string,
        })
    ),
    handlerOnConfirm: PropTypes.func,
};

export default FilterByDropdown;

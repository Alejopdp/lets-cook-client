import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import Tabs from "../../../molecules/tabs/tabs";

interface FilterOption {
    value: string | number;
    label: string;
}

export enum ExportOrdersFilterOptions {
    SEMANAS = "SEMANAS",
    FECHA_DE_ENTREGA = "FECHA DE ENTREGA",
    FECHA_DE_COBRO = "FECHA DE COBRO",
    CLIENTES = "CLIENTES",
}

interface ExportModalProps {
    title: string;
    weekOptions: FilterOption[];
    shippingDateOptions: FilterOption[];
    billingDateOptions: FilterOption[];
    customerOptions: FilterOption[];
    cancelButtonText: string;
    confirmButtonText: string;
    handleConfirmButton: (optionsSelected: FilterOption[], filterSelected: ExportOrdersFilterOptions) => void;
    handleCancelButton: () => void;
    open: boolean;
    handleClose: () => void;
}

const ExportModal = ({
    title,
    weekOptions = [],
    shippingDateOptions = [],
    billingDateOptions = [],
    customerOptions = [],
    cancelButtonText,
    confirmButtonText,
    handleConfirmButton = ([]) => {},
    handleCancelButton = () => {},
    open,
    handleClose = () => {},
}: ExportModalProps) => {
    const [_optionsSelected, setOptionsSelected] = useState([]);
    const [tabValue, setTabValue] = useState(0);

    const handleChecked = (itemFilter, checked) => {
        const index = _optionsSelected.findIndex(({ value }) => itemFilter.value === value);
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

    const handleTabChange = (e, value) => {
        setOptionsSelected([]);
        setTabValue(value);
    };

    const weekFilters = (
        <Grid container direction="column">
            {weekOptions.map((item, key) => (
                <Grid item xs key={key}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => handleChecked(item, e.target.checked)}
                                name={item.value.toString()}
                                color="primary"
                                checked={_optionsSelected.some(({ value }) => item.value === value)}
                            />
                        }
                        label={item.label}
                    />
                </Grid>
            ))}
        </Grid>
    );

    const shippingDateFilters = (
        <Grid container direction="column">
            {shippingDateOptions.map((item, key) => (
                <Grid item xs key={key}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => handleChecked(item, e.target.checked)}
                                name={item.value.toString()}
                                color="primary"
                                checked={_optionsSelected.some(({ value }) => item.value === value)}
                            />
                        }
                        label={item.label}
                    />
                </Grid>
            ))}
        </Grid>
    );

    const billingDateFilters = (
        <Grid container direction="column">
            {billingDateOptions.map((item, key) => (
                <Grid item xs key={key}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => handleChecked(item, e.target.checked)}
                                name={item.value.toString()}
                                color="primary"
                                checked={_optionsSelected.some(({ value }) => item.value === value)}
                            />
                        }
                        label={item.label}
                    />
                </Grid>
            ))}
        </Grid>
    );

    const customerFilters = (
        <Grid container direction="column">
            {customerOptions.map((item, key) => (
                <Grid item xs key={key}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => handleChecked(item, e.target.checked)}
                                name={item.value.toString()}
                                color="primary"
                                checked={_optionsSelected.some(({ value }) => item.value === value)}
                            />
                        }
                        label={item.label}
                    />
                </Grid>
            ))}
        </Grid>
    );

    // const options = [
    //     ExportOrdersFilterOptions.SEMANAS,
    //     ExportOrdersFilterOptions.FECHA_DE_ENTREGA,
    //     ExportOrdersFilterOptions.FECHA_DE_COBRO,
    //     ExportOrdersFilterOptions.CLIENTES,
    // ];
    // const content = [weekFilters, shippingDateFilters, billingDateFilters, customerFilters];
    const options = [
        ExportOrdersFilterOptions.SEMANAS,
        ExportOrdersFilterOptions.FECHA_DE_ENTREGA,
        ExportOrdersFilterOptions.FECHA_DE_COBRO,
    ];
    const content = [weekFilters, shippingDateFilters, billingDateFilters];

    return (
        <Dialog open={open} onClose={handleClose} style={{ minWidth: 342 }} maxWidth={false}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormGroup row>
                    <Tabs options={options} content={content} handleChange={handleTabChange} value={tabValue} />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={() => handleConfirmButton(_optionsSelected, options[tabValue])} color="primary">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportModal;

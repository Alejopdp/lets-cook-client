import { useState, useEffect, useMemo } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import Tabs from "../../../molecules/tabs/tabs";
import SearchInputField from "../../../molecules/searchInputField/searchInputField";
import TablePaginationActions from "components/molecules/tablePaginationActions/tablePaginationActions";

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
    isSubmitting: boolean;
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
    isSubmitting,
}: ExportModalProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [_optionsSelected, setOptionsSelected] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const [customersPage, setCustomersPage] = useState(0);
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

    useEffect(() => setCustomersPage(0), [searchValue]);

    const handleTabChange = (e, value) => {
        setOptionsSelected([]);
        setTabValue(value);
    };

    const customersLength = useMemo(() => customerOptions.length, [customerOptions]);

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

    const selectOrUnselectAllCustomers = () => {
        if (_optionsSelected.length !== customerOptions.length) setOptionsSelected([...customerOptions]);
        else setOptionsSelected([]);
    };

    //@ts-ignore
    const filteredCustomers = customerOptions.filter((customer) => customer.label.toLowerCase().includes(searchValue.toLowerCase())); //@ts-ignore

    const customerFilters = (
        <Grid container direction="column">
            <Grid item xs>
                <b>
                    <SearchInputField handlerOnChange={setSearchValue} placeholder="Buscar por nombre..." />
                </b>
            </Grid>
            <Grid item xs>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={selectOrUnselectAllCustomers}
                            name={"Seleccionar todos"}
                            color="primary"
                            checked={_optionsSelected.length === customerOptions.length && customerOptions.length > 0}
                        />
                    }
                    label={_optionsSelected.length !== customerOptions.length ? "Seleccionar todos" : "Deseleccionar todos"}
                />
            </Grid>
            {(searchValue ? filteredCustomers : customerOptions).slice(customersPage * 25, customersPage * 25 + 25).map((item, key) => (
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
            <TablePaginationActions
                count={searchValue ? filteredCustomers.length : customersLength}
                page={customersPage}
                rowsPerPage={25}
                onChangePage={(e, pageNumber) => setCustomersPage(pageNumber)}
            />
        </Grid>
    );

    const options = [
        ExportOrdersFilterOptions.SEMANAS,
        ExportOrdersFilterOptions.FECHA_DE_ENTREGA,
        ExportOrdersFilterOptions.FECHA_DE_COBRO,
        ExportOrdersFilterOptions.CLIENTES,
    ];
    const content = [weekFilters, shippingDateFilters, billingDateFilters, customerFilters];

    return (
        <Dialog open={open} onClose={handleClose} style={{ minWidth: 342, minHeight: "calc(100% - 64px)" }} maxWidth={false}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormGroup row>
                    <Tabs options={options} content={content} handleChange={handleTabChange} value={tabValue} showSelectAllCheckboxOption />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={() => handleConfirmButton(_optionsSelected, options[tabValue])} color="primary" disabled={isSubmitting}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExportModal;

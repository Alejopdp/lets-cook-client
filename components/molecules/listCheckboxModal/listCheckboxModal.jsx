import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormGroup, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { useState, useEffect } from "react";

const ListCheckboxModal = ({
    title,
    items = [],
    optionsSelected = [],
    cancelButtonText,
    confirmButtonText,
    handleConfirmButton = () => {},
    handleCancelButton = () => {},
    open,
    handleClose = () => {},
})  => {
    const [_optionsSelected, setOptionsSelected] = useState(optionsSelected);

    const handleChecked = (itemFilter, checked) => {
        const index = _optionsSelected.findIndex(({ code: _code }) => itemFilter.code === _code);
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

    useEffect(() => {
        setOptionsSelected(optionsSelected);
    }, [optionsSelected]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <FormGroup row>
                    <Grid container direction="column">
                        {items.map((item, key) => (
                            <Grid item xs key={key}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) => handleChecked(item, e.target.checked)}
                                            name={item.code}
                                            color="primary"
                                            checked={_optionsSelected.some(({ code }) => item.code === code)}
                                        />
                                    }
                                    label={item.label}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={() => handleConfirmButton(_optionsSelected)} color="primary">{confirmButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
}


export default ListCheckboxModal;
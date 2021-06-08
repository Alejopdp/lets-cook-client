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
}) => {
    const [_optionsSelected, setOptionsSelected] = useState(optionsSelected);

    const handleChecked = (itemFilter, checked) => {
        const index = _optionsSelected.findIndex(({ id }) => itemFilter.id === id);
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

        console.log("A ver las options selected: ", _optionsSelected);
    };

    useEffect(() => {
        setOptionsSelected(optionsSelected);
    }, []);

    return (
        <Dialog open={open} onClose={handleClose} style={{ minWidth: 342 }}>
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
                                            name={item.id}
                                            color="primary"
                                            checked={_optionsSelected.some(({ id }) => item.id === id)}
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
                <Button onClick={() => handleConfirmButton(_optionsSelected)} color="primary">
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ListCheckboxModal;

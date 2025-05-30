// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../../../atoms/modal/modal";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import DataDisplay from "../../../../molecules/dataDisplay/dataDisplay";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const EditRestrictionsModal = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [restrictions, setRestrictions] = useState("");
    const [comments, setComments] = useState("");

    useEffect(() => {
        setRestrictions("");
        setComments("");
    }, [props.open]);

    const handleChangeRestriction = (event) => {
        setRestrictions(event.target.value);
    };

    const handleChangeComments = (event) => {
        setComments(event.target.value);
    };

    const handleSubmitEditRestrictions = () => {
        props.handlePrimaryButtonClick(restrictions, comments);
    };

    const handleDisabled = () => {
        if (restrictions == "") {
            return true;
        } else {
            return false;
        }
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={handleSubmitEditRestrictions}
            title="Modificar restricciones"
            primaryButtonText="Modificar restricciones"
            secondaryButtonText="cerrar"
            fullScreen
            disabled={handleDisabled()}
        >
            <DataDisplay title="Restricción actual" text={props.actualRestriction.text} style={{ marginBottom: theme.spacing(3) }} />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Nueva restricción</InputLabel>
                <Select
                    native
                    value={restrictions}
                    onChange={handleChangeRestriction}
                    label="Nueva restricción"
                    inputProps={{ name: "reason", id: "outlined-age-native-simple" }}
                >
                    <option key="0" value=""></option>
                    {props.restrictions.map((restriction) => (
                        <option key={restriction.id} value={restriction.id}>
                            {restriction.text}
                        </option>
                    ))}
                </Select>
                <TextField
                    id="created_by_error_comments"
                    label="Comentarios adicionales "
                    multiline
                    rows={5}
                    variant="outlined"
                    value={comments}
                    onChange={handleChangeComments}
                    style={{ marginTop: theme.spacing(2) }}
                />
            </FormControl>
        </Modal>
    );
};

export default EditRestrictionsModal;

// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";


// External Components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


// Internal components


const ApplyCoupon = props => {
    const theme = useTheme();

    const handleDisableButton = () => {
        if (props.value == '') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Box style={props.style}>
            <div style={{ display: 'flex' }}>
                <TextField type='text' value={props.value} onChange={props.handleChange} id="outlined-basic" label="Código" variant="outlined" style={{ width: '100%' }} />
                <Button disabled={handleDisableButton()} size="small" color='primary' style={{ marginLeft: theme.spacing(2) }} onClick={props.handleClick}>
                    APLICAR
                </Button>
            </div>
        </Box>
    );
};

export default ApplyCoupon;

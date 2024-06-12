// Utils & Config
import React, { useRef } from "react";
import { useTheme } from "@material-ui/core/styles";

// External Components
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Internal components

const Refund = (props) => {
    const theme = useTheme();
    const submitButtonRef = useRef(null);

    const handleDisableButton = () => {
        if (props.value === 0 || props.value == "" || props.value > props.totalAmount) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <Box style={props.style}>
            <div>
                <Box display="flex" marginBottom={1}>
                    <TextField
                        type="number"
                        value={props.value}
                        onChange={props.handleChange}
                        id="outlined-basic"
                        label="Monto a reembolsar"
                        variant="outlined"
                        style={{ width: "100%" }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !handleDisableButton()) {
                                props.handleClick;
                            }
                        }}
                    />
                    <Button
                        ref={submitButtonRef}
                        disabled={handleDisableButton()}
                        size="small"
                        color="primary"
                        style={{ marginLeft: theme.spacing(2) }}
                        onClick={props.handleClick}
                    >
                        APLICAR
                    </Button>
                </Box>
            </div>
        </Box>
    );
};

export default Refund;

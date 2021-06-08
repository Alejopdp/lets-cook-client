import { Grid, InputAdornment, Typography } from "@material-ui/core";
import Input from "../../atoms/input/input";

const ParagraphWithSimpleInput = ({ paragraph = "", inputType, inputLabel = "", inputName, inputRightText, inputValue, handleOnChage }) => (
    <Grid container direction="column" spacing={1}>
        <Grid item xs={12}>
            <Typography>{paragraph}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Input
                label={inputLabel}
                name={inputName}
                type={inputType}
                value={inputValue}
                handleChange={handleOnChage}
                customProps={{
                    InputProps: {
                        endAdornment: <InputAdornment position="end">{inputRightText}</InputAdornment>,
                    },
                }}
            />
        </Grid>
    </Grid>
);
export default ParagraphWithSimpleInput;

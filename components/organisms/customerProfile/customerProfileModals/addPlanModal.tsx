// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// External components
import Input from "../../../atoms/input/input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { translateFrequency } from "helpers/i18n/i18n";

const useStyles = makeStyles((theme) => ({
    selectField: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
}));

const AddPlanModal = (props) => {
    const { selectField } = useStyles();

    return (
        <Box minWidth="400px">
            <FormControl className={selectField} variant="outlined">
                <InputLabel>Plan</InputLabel>
                <Select value={props.selectedPlan} onChange={props.handlePlanSelect} label="Plan">
                    {props.plans.map((plan, index) => (
                        <MenuItem value={plan} key={index}>
                            {plan.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={selectField} variant="outlined">
                <InputLabel>Variante</InputLabel>
                <Select value={props.selectedVariation} onChange={props.handleVariationSelect} label="Variante">
                    {props.selectedPlan.variants.map((variant, index) => (
                        <MenuItem value={variant} key={index}>
                            {variant.descriptionWithPrice}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={selectField} variant="outlined" style={{ marginBottom: 0 }}>
                <Input handleChange={props.handleCouponChange} helperText="" label="Cupón" name="coupon" value={props.coupon} />
            </FormControl>

            {!!props.selectedPlan && !!props.selectedPlan.id && (
                <FormControl className={selectField} variant="outlined">
                    <InputLabel>Frecuencia</InputLabel>
                    <Select value={props.selectedFrequency} onChange={props.handleChangeFrequency} label="Frecuencia">
                        {props.selectedPlan.availablePlanFrecuencies.map((frequency, index) => (
                            <MenuItem value={frequency} key={index}>
                                {translateFrequency(frequency)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            <FormControlLabel
                control={
                    <Checkbox
                        onChange={() => props.setUseWalletAsPaymentMethod(!props.useWalletAsPaymentMethod)}
                        name="useWalletAsPaymentMethod"
                        value={props.useWalletAsPaymentMethod}
                        checked={props.useWalletAsPaymentMethod}
                        color="primary"
                    />
                }
                label="Usar monedero como método de pago"
                style={{ marginBottom: 8 }}
            />

            {props.selectedPlan.description && <Typography variant="body1">{props.selectedPlan.description}</Typography>}
        </Box>
    );
};

export default AddPlanModal;

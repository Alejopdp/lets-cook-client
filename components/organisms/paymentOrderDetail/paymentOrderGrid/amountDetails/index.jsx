// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";


// External Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";


// Internal components


const AmountDetails = props => {
    const theme = useTheme();

    return (
        <Box style={props.style}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(1) }}>
                <Typography variant='body1' color='textSecondary'>Subtotal:</Typography>
                <Typography variant='body1' color='textSecondary'>{props.data.subtotal}</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(1) }}>
                <Typography variant='body1' color='textSecondary'>Gastos de envío:</Typography>
                <Typography variant='body1' color='textSecondary'>{props.data.shippingCost}</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(1) }}>
                <Typography variant='body1' color='textSecondary'>Descuentos:</Typography>
                <Typography variant='body1' color='textSecondary'>{props.data.discount}</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
                <Typography variant='body1' color='textSecondary'>Impuestos (incluido):</Typography>
                <Typography variant='body1' color='textSecondary'>{props.data.taxes}</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: theme.spacing(2), borderTop: '1px dashed rgba(0,0,0,0.15)' }}>
                <Typography variant='body1' color='textSecondary' style={{ fontWeight: 600 }}>Total:</Typography>
                <Typography variant='body1' color='textSecondary' style={{ fontWeight: 600 }}>{props.data.total}</Typography>
            </div>
        </Box>
    );
};

export default AmountDetails;

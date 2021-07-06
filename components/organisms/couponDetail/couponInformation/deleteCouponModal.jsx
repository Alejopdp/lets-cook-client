// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Typography from '@material-ui/core/Typography';

// Internal components
import Modal from '../../../atoms/modal/modal'

const DeactivateCouponModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Eliminar cupón'
            primaryButtonText='Eliminar cupón'
            primaryButtonColor='#FC1919'
            secondaryButtonText='cancelar'
        >
            <Typography variant='body1' color='textSecondary' style={{ fontSize: '16px' }}>
                ¿Estás seguro de que quieres eliminar este cupón? El mismo dejará de ser válido para cualquier cliente que lo esté utilizando en más de un cargo (si aplica).
            </Typography>
        </Modal>
    );
}

export default DeactivateCouponModal;
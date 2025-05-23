// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../../../atoms/modal/modal'
import Typography from '@material-ui/core/Typography';


const CancelOrderModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Cancelar orden'
            primaryButtonText='cancelar'
            primaryButtonColor='#FC1919'
            secondaryButtonText='cancelar'
        >
            <Typography variant='body1' color='textSecondary' style={{ fontSize: '16px' }}>
                ¿Estás seguro de que quieres cancelar la orden?
            </Typography>
        </Modal>
    );
}

export default CancelOrderModal;
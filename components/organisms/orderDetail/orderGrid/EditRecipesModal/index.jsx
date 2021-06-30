// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../../../atoms/modal/modal'
import Typography from '@material-ui/core/Typography';

// Internal Components
import Selector from './selector'

const EditRecipesModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Modificar recetas'
            primaryButtonText='Modificar recetas'
            secondaryButtonText='cancelar'
        >
            {props.data.map((recipe) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(0.5) }}>
                        {recipe.name}
                    </Typography>
                    <Selector quantity={recipe.quantitySelected} id={recipe.id} handleChange={props.handleEditRecipeQuantity}/>
                </div>
            ))}
        </Modal>
    );
}

export default EditRecipesModal;
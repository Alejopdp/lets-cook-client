import React from "react";
import PropTypes from "prop-types";
import SimpleModal from "../../../molecules/simpleModal/simpleModal";

interface DeleteRecipeVariantModalProps {
    handleClose: () => void;
    handleConfirmButton: () => void;
    open: () => void;
}

const DeleteRecipeVariantModal = (props: DeleteRecipeVariantModalProps) => {
    return (
        <SimpleModal
            cancelButtonText="VOLVER"
            confirmButtonText="ELIMINAR"
            handleCancelButton={props.handleClose}
            handleClose={props.handleClose}
            handleConfirmButton={props.handleConfirmButton}
            open={props.open}
            paragraphs={["¿Estás seguro que quieres eliminar la variante? Cualquier selección de recetas con esta variante se perderá"]}
            title="Eliminar variante"
        />
    );
};

DeleteRecipeVariantModal.propTypes = {};

export default DeleteRecipeVariantModal;

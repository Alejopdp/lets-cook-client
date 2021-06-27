// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Grid, Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import InformationItem from "../../../atoms/informationItem/informationItem";

const Applications = (props) => {
    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer title="Aplicaciones" fullWdith>
                <Typography variant="body1" color="initial">
                    {props.applications || "10 de ∞"}
                </Typography>
                <Typography variant="body1" color="initial">
                    10 clientes han aplicado este cupón
                </Typography>
                <Typography variant="body1" color="initial">
                    No hay límite en la cantidad de clientes que pueden utilizarlo
                </Typography>
            </PaperWithTitleContainer>
        </Grid>
    );
};

Applications.propTypes = {};

export default Applications;

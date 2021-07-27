// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ActualWeekRecipesDetail = (props) => {
    const theme = useTheme();

    return (
        <>
            <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px", marginBottom: theme.spacing(1) }}>
                Semana del {props.data.weekName}
            </Typography>
            <div style={{ marginBottom: theme.spacing(3) }}>
                {props.data.recipes.map((recipe) => (
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(0.5) }}>
                        {recipe.name}
                    </Typography>
                ))}
            </div>
            <Button size="medium" color="textSecondary" onClick={props.handleClick}>
                MODIFICAR RECETAS
            </Button>
        </>
    );
};

export default ActualWeekRecipesDetail;

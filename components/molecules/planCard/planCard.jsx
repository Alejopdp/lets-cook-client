// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Create as EditIcon, Delete as DeleteIcon, AccessTime as TimeIcon } from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles((theme) => ({
    height140: {
        minHeight: 140,
    },
    width220: {
        maxWidth: 300,
        width: "100%",
    },
}));

const PlanCard = ({ item, handlerEdit = () => {}, handlerDelete = () => {}, handlerSwitch = () => {} }) => {
    const classes = useStyles();

    return (
        <Card className={classes.width220}>
            <CardMedia className={classes.height140} image="/static/images/placeholder-image.png" title="Contemplative Reptile" />
            <CardContent>
                <Typography color="textSecondary" variant="overline" style={{ fontSize: 12, fontWeight: "Light" }}>
                    SKU: {item.sku}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                    {item.name}
                </Typography>
                <Typography color="textSecondary" variant="body1" paragraph={true} gutterBottom style={{ fontSize: 12 }}>
                    Plan {item.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={1}>
                    <Grid item>
                        <IconButton
                            color="default"
                            component="span"
                            onClick={() => {
                                handlerEdit(item);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            color="default"
                            component="span"
                            onClick={() => {
                                handlerDelete(item);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid xs item style={{ alignItems: "flex-end", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Switch checked={item.isActive} onChange={() => handlerSwitch} color="primary" />
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

PlanCard.propTypes = {
    item: PropTypes.exact({
        sku: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
    }),
    handlerEdit: PropTypes.func,
    handlerDelete: PropTypes.func,
    handlerSwitch: PropTypes.func,
};

export default PlanCard;

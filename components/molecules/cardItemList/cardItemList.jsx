import React from "react";
import PropTypes from "prop-types";
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Create as EditIcon, Delete as DeleteIcon, AccessTime as TimeIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    height140: {
        minHeight: 140,
    },
    width220: {
        maxWidth: 300,
        width:"100%"
    },
}));

const CardItemList = ({ item, handlerEdit = () => {}, handlerDelete = () => {}, handlerScheduler = () => {} }) => {
    const classes = useStyles();
    return (
        <Card className={classes.width220}>
            <CardMedia className={classes.height140} image="/static/images/placeholder-image.png" title="Contemplative Reptile" />
            <CardContent>
                <Typography color="textSecondary" variant="overline">
                    SKU: {item.sku}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                    {item.name}
                </Typography>
                <Typography color="textSecondary" variant="body1" paragraph={true} gutterBottom>
                    {item.description}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TimeIcon color="primary" fontSize="small" />
                    <Typography color="textSecondary" noWrap={true}>
                        <i>{item.schedule.join(", ")}</i>
                    </Typography>
                </div>
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
                    <Grid xs item style={{ textAlign: "end" }}>
                        <IconButton
                            color="default"
                            component="span"
                            onClick={() => {
                                handlerScheduler(item);
                            }}
                        >
                            <TimeIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
};

CardItemList.propTypes = {
    item: PropTypes.exact({
        sku: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        schedule: PropTypes.arrayOf(PropTypes.string),
    }),
    handlerEdit: PropTypes.func,
    handlerDelete: PropTypes.func,
    handlerScheduler: PropTypes.func,
};

export default CardItemList;

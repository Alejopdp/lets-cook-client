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
        width: "100%",
    },
}));

const CardItemList = ({ 
    item, 
    handlerEdit = () => {}, 
    handlerDelete = () => {}, 
    handlerScheduler = () => {} 
}) => {
    const classes = useStyles();
    const defaultImage = "/static/images/placeholder-image.png";
    const image = Boolean(item.imageUrl) ? item.imageUrl : defaultImage;
    return (
        <Card className={classes.width220}>
            <CardMedia className={classes.height140} image={image} title="Contemplative Reptile" />
            <CardContent>
                <Typography color="textSecondary" variant="overline">
                    SKU: {item.sku}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                    {item.name}
                </Typography>
                <Typography color="textSecondary" variant="body1" paragraph={true} gutterBottom>
                    {item.shortDescription}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <TimeIcon color="primary" fontSize="small" />
                    <Typography color="textSecondary" noWrap={true}>
                        {/* TODO: Add schedule */}
                        <i>{["10-17 Abril", "18-25 Abril", "26-03 Mayo"].join(", ")}</i>
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
    item: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sku: PropTypes.string,
        shortDescription: PropTypes.string,
        longDescription: PropTypes.string,
        cookDuration: PropTypes.string,
        difficultyLevel: PropTypes.string,
        imageUrl: PropTypes.string,
        weight: PropTypes.string,
        backOfficeTags: PropTypes.arrayOf(PropTypes.string),
        imageTags: PropTypes.arrayOf(PropTypes.string),
    }),
    handlerEdit: PropTypes.func,
    handlerDelete: PropTypes.func,
    handlerScheduler: PropTypes.func,
};

export default CardItemList;

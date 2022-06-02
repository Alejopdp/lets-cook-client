import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Create as EditIcon, Delete as DeleteIcon, AccessTime as TimeIcon } from "@material-ui/icons";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const useStyles = makeStyles((theme) => ({
    height140: {
        minHeight: 140,
    },
    maxWidth240: {
        maxWidth: 240,
        width: "100%",
    },
    paragraphTrunc: {
        display: "box",
        maxWidth: 194,
        height: 48,
        overflow: "hidden",
        lineClamp: 2,
        boxOrient: "vertical",
        marginBottom: theme.spacing(2),
    },
}));

const CardItemList = ({ item, handlerEdit = () => {}, handlerDelete = () => {}, handlerScheduler = () => {} }) => {
    const classes = useStyles();
    const defaultImage = "/static/images/placeholder-image.png";
    const image = Boolean(item.imageUrl) ? item.imageUrl : defaultImage;
    const { userInfo } = useUserInfoStore();

    const canEditRecipes = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.UPDATE_RECIPE),
        [userInfo]
    );

    const _getAvailableWeeksTag = () => {
        if (Boolean(item.availableWeeks)) {
            if (item.availableWeeks.length > 0) {
                return item.availableWeeks.reduce((text, week) => `${text} ${week.label}`, "");
            } else {
                return "Sin programar";
            }
        }
    };

    return (
        <Card className={classes.width220}>
            <CardMedia className={classes.height140} image={image} title="Contemplative Reptile" />
            <CardContent>
                <Typography color="textSecondary" variant="overline">
                    SKU: {item.sku}
                </Typography>
                <Typography noWrap={true} color="textSecondary" variant="subtitle1">
                    {item.name}
                </Typography>

                <div style={{ display: "flex", alignItems: "center" }}>
                    <TimeIcon color="primary" fontSize="small" />
                    <Typography color="textSecondary" noWrap={true}>
                        <i>{_getAvailableWeeksTag()}</i>
                    </Typography>
                </div>
            </CardContent>
            {canEditRecipes && (
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
            )}
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
        availableWeeks: PropTypes.arrayOf(
            PropTypes.exact({
                id: PropTypes.number,
                label: PropTypes.string,
            })
        ),
        availableMonths: PropTypes.arrayOf(PropTypes.string),
    }),
    handlerEdit: PropTypes.func,
    handlerDelete: PropTypes.func,
    handlerScheduler: PropTypes.func,
};

export default CardItemList;

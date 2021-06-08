import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropsType from "prop-types";
import { Button, Grid, IconButton, Typography } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import CheckboxList from "../../atoms/checkboxList/checkboxList";
import ComplexModal from "../complexModal/complexModal";
import { simpleTileList } from "../../../lang";

const SimpleTileList = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [newItemsToAdd, setNewItemsToAdd] = useState(props.listItemsSelected);
    const { locale } = useRouter();

    useEffect(() => {
        if (openDialog) {
            console.log("***->  Listado de itens: ", props.listItemsSelected);
            setNewItemsToAdd(props.listItemsSelected);
        }
    }, [openDialog]);

    const itemsList = () =>
        props.list.map((item, index) => ({
            name: item.name,
            value: item,
            id: item.id,
            checked: newItemsToAdd.some((id) => item.id === id),
            label: (
                <Typography key={index}>
                    <b>{item.name}</b> {item.type}
                </Typography>
            ),
        }));

    const itemsListSelected = () =>
        props.list.reduce((list, currItem, index) => {
            const isContained = props.listItemsSelected.some((id) => currItem.id === id);
            if (!isContained) return list;
            return [
                ...list,
                <Grid key={index} item>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {!props.hideRemoveButton && (
                            <IconButton onClick={() => props.handleRemoveItem(currItem)}>
                                <Delete />
                            </IconButton>
                        )}
                        <Typography>
                            {props.useBold ? <b>{currItem.name}</b> : currItem.name} {currItem.type}
                        </Typography>
                    </div>
                </Grid>,
            ];
        }, []);

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Grid container direction="column">
                        {itemsListSelected()}
                    </Grid>
                </Grid>
                <Grid item>
                    <Button color="default" variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
                        {props.buttonAddTitle || simpleTileList[locale].buttonTitle}
                    </Button>
                </Grid>
            </Grid>

            <ComplexModal
                title={props.buttonAddTitle || simpleTileList[locale].buttonTitle}
                cancelButtonText={simpleTileList[locale].cancelButtonText}
                confirmButtonText={props.buttonAddTitle || simpleTileList[locale].buttonTitle}
                open={openDialog}
                handleConfirmButton={() => {
                    props.handleChangeList([...newItemsToAdd]);
                    setOpenDialog(false);
                }}
                handleCancelButton={() => setOpenDialog(false)}
                component={
                    <CheckboxList
                        items={itemsList()}
                        handleOnChange={({ item, checked: isAdd }) => {
                            if (isAdd) {
                                setNewItemsToAdd([...newItemsToAdd, item.id]);
                            } else {
                                setNewItemsToAdd(newItemsToAdd.filter((id) => item.id !== id));
                            }
                        }}
                    />
                }
            />
        </>
    );
};

SimpleTileList.propType = {
    list: PropsType.arrayOf(
        PropsType.shape({
            name: PropsType.string,
            type: PropsType.any,
            id: PropsType.any,
        })
    ).isRequired,
    listItemsSelected: PropsType.arrayOf(
        PropsType.shape({
            name: PropsType.string,
            type: PropsType.any,
            id: PropsType.any,
        })
    ),
    buttonAddTitle: PropsType.string,
    handleChangeList: PropsType.func,
    handleRemoveItem: PropsType.func,
    hideRemoveButton: PropsType.bool,
    useBold: PropsType.bool,
};

export default SimpleTileList;

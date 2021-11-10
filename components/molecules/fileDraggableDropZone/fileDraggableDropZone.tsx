import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMove } from "react-sortable-hoc";
import { makeStyles } from "@material-ui/core/styles";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import { useDropzone } from "react-dropzone";
import { useEffect, useContext } from "react";
import { IconButton, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        width: "90px",
        height: "90px",
        backgroundColor: "#bababa",
        borderRadius: "8px",
    },

    dropzone: {
        backgroundColor: "#F5F5F5",
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#eeeeee",
        borderStyle: "dashed",
        padding: "20px",
        cursor: "pointer",
    },

    thumbsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 16,
    },

    thumbInner: {
        display: "flex",
        minWidth: 0,
        overflow: "hidden",
    },

    img: {
        display: "block",
        width: "auto",
        height: "25",
    },

    cloudImg: {
        width: "40px",
        height: "40px",
        color: theme.palette.text.secondary,
    },

    dropzoneText: {
        color: "#748AA1",
        fontWeight: 700,
    },
    information: {
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        marginTop: "10px",
        marginBottom: "10px",
    },
    deleteIcon: {
        top: 7,
        right: -12,
        position: "absolute",
        cursor: "pointer",
        color: theme.palette.text.secondary,
    },
}));

const SortableItem = SortableElement(({ value, src }) => {
    const classes = styles();
    return (
        <div className={classes.container}>
            <img src={src} width="100%" height="100%" style={{ borderRadius: "8px", objectFit: "cover" }} />
        </div>
    );
});

const SortableList = SortableContainer(({ items, onDelete }) => {
    const classes = styles();
    console.log("ITEMS: ", items);
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            {items.map((value, index) => (
                <div style={{ position: "relative", marginRight: "10px" }} key={`item-${value.size} ${index}`}>
                    <SortableItem index={index} src={value.url} value={value} />
                    <DeleteIcon className={classes.deleteIcon} onClick={() => onDelete(value)} />
                </div>
            ))}
        </div>
    );
});

interface FileDraggableProps {
    name: string;
    getFiles?: () => void;
    previousImages: File[];
    hasPreviousImages: boolean;
    handleData: (name: string, files: File[]) => void;
    files: any[];
}

const FIleDraggable = (props: FileDraggableProps) => {
    const classes = styles();
    const saveFiles = props?.getFiles || null;

    const [files, setFiles] = useState(props.files);
    console.log("State files: ", files);

    const setPreviousImages = () => {
        setFiles(props.previousImages);
    };

    useEffect(() => {
        if (props.hasPreviousImages) {
            setPreviousImages();
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            let tempFiles = [...files];
            let newAcceptedFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    url: URL.createObjectURL(file),
                })
            );

            let tempName = files.map((item) => item.name);
            newAcceptedFiles = newAcceptedFiles.filter((value) => tempName.indexOf(value.name) === -1);
            setFiles(tempFiles.concat(newAcceptedFiles));
            props.handleData(props.name, tempFiles.concat(newAcceptedFiles));
        },
    });

    // useEffect(
    //   () => () => {
    //     // Make sure to revoke the data uris to avoid memory leaks
    //     files.forEach((file) => URL.revokeObjectURL(file.preview));
    //   },
    //   [files]
    // );

    // useEffect(() => {
    //   return () => {
    //     files.forEach((file) => URL.revokeObjectURL(file.preview));
    //   };
    // }, [files]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        console.log("Files before distri: ", files);
        let filesDistribution = arrayMove(files, oldIndex, newIndex);
        console.log("File distri: ", filesDistribution);
        setFiles(filesDistribution);
        props.handleData(props.name, filesDistribution);
    };

    const deleteItem = (item) => {
        let actualFiles = files;
        console.log(actualFiles);
        actualFiles.splice(actualFiles.indexOf(item), 1);
        setFiles(actualFiles);
        props.handleData(props.name, actualFiles);
    };
    return (
        <>
            <section className="container">
                <div {...getRootProps({ className: "dropzone" })} className={classes.dropzone}>
                    <input {...getInputProps()} />

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ImageSearchIcon className={classes.cloudImg} />
                        <Typography variant="body1" className={classes.information}>
                            Arrastra o hace clic para subir imagenes
                        </Typography>
                    </div>
                </div>
            </section>
            {(props.files || []).length > 0 ? (
                <Typography variant="body2" className={classes.information}>
                    <InfoIcon style={{ marginRight: "0.5em" }} />
                    Las imagenes se mostrarán de izquierda a derecha, siendo la primera la que se mostrará como portada. Puedes modificar el
                    orden de las imagenes arrastrandolas hacia el lugar deseado
                </Typography>
            ) : (
                <></>
            )}
            <SortableList axis="x" items={props.files || []} onSortEnd={onSortEnd} onDelete={deleteItem} />
        </>
    );
};

export default FIleDraggable;

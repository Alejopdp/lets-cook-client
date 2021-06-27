// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").usersDashboard;
import { useSnackbar } from "notistack";
import { deleteUser } from "../../../helpers/serverRequests/user";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import UsersTable from "./usersTable/usersTable";
import CustomButton from "../../atoms/button/button";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import EmptyImage from "../../molecules/emptyImage/emptyImage";

// Icons & images
import AddIcon from "@material-ui/icons/Add";

const UsersDashboard = (props) => {
    const router = useRouter();
    var lang = langs[router.locale];
    const [users, setusers] = useState([...props.users]);
    const [selectedUser, setselectedUser] = useState({});
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleEdit = (userId) => {
        router.push({ pathname: "/gestion-de-usuarios/modificar", query: { id: userId.toString() } });
    };

    const handleOpenDeleteModal = (user) => {
        setselectedUser(user);
        setisDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        const res = await deleteUser(selectedUser.id);

        if (res.status === 200) {
            setusers(users.filter((user) => user.id !== selectedUser.id));
            enqueueSnackbar("Se ha eliminado el usuario correctamente", {
                variant: "success",
            });

            setisDeleteModalOpen(false);
        } else {
            enqueueSnackbar("Error al eliminar el usuario", {
                variant: "error",
            });
        }
    };

    return (
        <>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">{lang.title}</Typography>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={() => router.push("/gestion-de-usuarios/crear")}
                    >
                        {lang.button}
                    </CustomButton>
                </Box>
            </Grid>
            {users.length > 0 ? (
                <Grid item xs={12}>
                    <UsersTable users={users} handleEdit={handleEdit} handleOpenDeleteModal={handleOpenDeleteModal} />
                </Grid>
            ) : (
                <EmptyImage label="Aún no hay usuarios creados" />
            )}
            {isDeleteModalOpen && (
                <SimpleModal
                    cancelButtonText={lang.deleteModal.cancelButton}
                    confirmButtonText={lang.deleteModal.confirmButton}
                    handleCancelButton={() => setisDeleteModalOpen(false)}
                    handleClose={() => setisDeleteModalOpen(false)}
                    handleConfirmButton={handleDelete}
                    open={isDeleteModalOpen}
                    title={lang.deleteModal.title}
                    paragraphs={[lang.deleteModal.text]}
                />
            )}
        </>
    );
};

UsersDashboard.propTypes = {
    users: PropTypes.array,
};

export default UsersDashboard;

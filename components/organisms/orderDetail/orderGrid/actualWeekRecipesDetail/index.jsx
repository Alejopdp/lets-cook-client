// Utils & Config
import React, { useMemo } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Permission } from "helpers/types/permission";
import { useUserInfoStore } from "stores/auth";

// External Components
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ActualWeekRecipesDetail = (props) => {
    const theme = useTheme();
    const { userInfo } = useUserInfoStore();

    const canEdit = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.UPDATE_ORDER),
        [userInfo]
    );
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
            {canEdit && (
                <Button size="medium" color="textSecondary" onClick={props.handleClick}>
                    MODIFICAR RECETAS
                </Button>
            )}
        </>
    );
};

export default ActualWeekRecipesDetail;

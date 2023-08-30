import React from "react";
import PaperWithTitleContainer from "components/molecules/paperWithTitleContainer/paperWithTitleContainer";
import { Typography } from "@material-ui/core";

type OtherInfoProps = {
    friendCode: string;
};

const OtherInfo = (props) => {
    return (
        <PaperWithTitleContainer title="Otros datos" fullWidth>
            <Typography variant="subtitle2">Código MGM</Typography>
            <Typography variant="body1" paragraph>
                {props.friendCode}
            </Typography>
        </PaperWithTitleContainer>
    );
};

export default OtherInfo;

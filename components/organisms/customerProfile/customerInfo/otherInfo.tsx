import React from "react";
import PropTypes from "prop-types";
import PaperWithTitleContainer from "components/molecules/paperWithTitleContainer/paperWithTitleContainer";
import { Typography } from "@material-ui/core";

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

OtherInfo.propTypes = {};

export default OtherInfo;

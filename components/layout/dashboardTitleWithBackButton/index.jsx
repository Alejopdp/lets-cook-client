// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components

// Images & icons
import ArrowBack from "@material-ui/icons/ArrowBack";

const DasboardWithBackTitle = (props) => {
    const router = useRouter();

    return (
        <Box
            display="inline-flex"
            alignItems="center"
            onClick={() => (props.handleClick ? props.handleClick() : router.back())}
            style={{ cursor: "pointer" }}
        >
            <Box display="flex" marginRight={1}>
                <ArrowBack fontSize="24px" />
            </Box>
            <Typography variant="h1" style={{ fontSize: 24 }}>
                {props.title}
            </Typography>
        </Box>
    );
};

DasboardWithBackTitle.propTypes = {
    handleClick: PropTypes.func,
    title: PropTypes.string.isRequired,
};

export default DasboardWithBackTitle;

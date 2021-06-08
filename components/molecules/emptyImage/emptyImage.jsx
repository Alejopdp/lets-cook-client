import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { Grid, Typography, Container } from "@material-ui/core";

const EmptyImage = ({ label }) => {
    return (
        <Container maxWidth='xs'>
            <Grid container direction="column" alignItems="center" style={{ marginTop: 64 }}>
                <Grid item>
                    <Image width="150" height="100" src={`/static/images/blank-paper.png`} alt={label} />
                </Grid>
                <Grid item xs>
                    <Typography variant="subtitle1" align='center' style={{ fontWeight: "600" }}>
                        {label}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

EmptyImage.propTypes = {
    label: PropTypes.string,
};

export default EmptyImage;

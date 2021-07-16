import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { CallMerge } from "@material-ui/icons";
import { LocationSearchInputProps } from "./intertfaces";

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
    root: {},
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
    autocompleteRoot: {
        width: "100%",
    },

    endAdornment: {
        display: "none",
    },
}));


const LocationSearchInput = (props: LocationSearchInputProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    if (typeof window !== "undefined" && !loaded.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(
                "https://maps.googleapis.com/maps/api/js?key=AIzaSyBjdaFuKAmhBmINwTignYPwQmzdVkld53Q&components=country:sp&strictbounds=true&libraries=places",
                document.querySelector("head"),
                "google-maps"
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions({ ...request, componentRestrictions: { country: "es" } }, callback);
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google!) {
            autocompleteService.current = new window.google!.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [props.value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google-map-demo"
            classes={{ endAdornment: classes.endAdornment, root: classes.autocompleteRoot }}
            fullWidth
            getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={props.value}
            noOptionsText={
                !!props.value ? "No se encontró ninguna dirección" : "Comienze a escribir para ver las sugerencias de direcciones"
            }
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                props.handleChange(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                // setValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={props.name}
                    classes={{ root: classes.root }}
                    label="Ingrese su dirección"
                    variant="outlined"
                    fullWidth
                />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length])
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}

LocationSearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default LocationSearchInput
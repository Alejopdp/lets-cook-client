import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBjdaFuKAmhBmINwTignYPwQmzdVkld53Q");
Geocode.setLanguage("es");
Geocode.setRegion("es");

// set location_type filter . Its optional.
// google geocoder returns more that one address for given lat/lng.
// In some case we need one address as response for which google itself provides a location_type filter.
// So we can easily parse the result for fetching address components
// ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
// And according to the below google docs in description, ROOFTOP param returns the most accurate result.
// Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
Geocode.enableDebug();

export const getGeometry = async (address) => {
    // Get latitude & longitude from address.
    try {
        const response = await Geocode.fromAddress(address);
        const location = response.results[0].geometry.location;

        return location;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

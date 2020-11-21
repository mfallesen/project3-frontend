import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = (props) => {
    // const lat = props.lat;
    // console.log("Lat: ", lat);
    // const lon = props.lat;
    // console.log("Lon: ", lon);

    const mapStyles = {
        height: "250px",
        width: "100%"
    };

    const location = {
        lat: 0, lng: 0
    }


    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={location}
            >
                <Marker position={location} />
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;
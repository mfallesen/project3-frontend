import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {

    const mapStyles = {
        height: "20vh",
        width: "20%"
    };

    const defaultCenter = {
        lat: 47.7859138, lng: -123.92106
    }

    const location = {
        lat: 47.7859138, lng: -123.92106
    }


    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
            >
                <Marker position={location} />
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;
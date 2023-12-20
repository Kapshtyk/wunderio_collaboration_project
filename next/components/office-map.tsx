import { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import { OfficeLocations } from "@/lib/zod/office-locations";

/* import { env } from "@/env"; */

interface MapsProps {
  maps: OfficeLocations[];
}

const OfficeLocationsMap = ({ maps }: MapsProps) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const newMarkers = maps.map((office) => ({
      position: {
        lat: office.field_address_coordinates.lat,
        lng: office.field_address_coordinates.lon,
      },
      title: office.field_office_address,
    }));

    setMarkers(newMarkers);
  }, [maps]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDFHz-zBARgR11y63cmaFJ3lTFUfcEaKSA" as string,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const mapOptions = {
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#B49FE2" }],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9E005D" }],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [{ color: "#F7F7F8" }],
      },
    ],
  };

  return (
    <div className="">
      <GoogleMap
        center={markers.length > 0 ? markers[0].position : { lat: 0, lng: 0 }}
        zoom={5}
        mapContainerStyle={{
          height: "100%",
          width: "100%",
          backgroundColor: "red",
        }}
        options={mapOptions}
      >
        {markers.map((marker, index) => (
          <MarkerF
            key={index}
            position={marker.position}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default OfficeLocationsMap;

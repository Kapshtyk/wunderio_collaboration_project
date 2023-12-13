import { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

/* import { env } from "@/env";
 */
interface MapModalProps {
  lat: number;
  lng: number;
}

const EventMapModal: React.FC<MapModalProps> = ({ lat, lng }) => {
  const [markers, setMarkers] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const newMarkers = {
      lat: lat,
      lng: lng,
    };
    setMarkers(newMarkers);
  }, [lat, lng]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const getDirectionsUrl = (lat: number, lon: number) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
  };

  return (
    <>
      <GoogleMap
        center={{ lat: markers.lat, lng: markers.lng }}
        zoom={15}
        mapContainerStyle={{ height: "200px", width: "50%" }}
      >
        <MarkerF position={{ lat: markers.lat, lng: markers.lng }} />
      </GoogleMap>

      <p>
        <a
          href={getDirectionsUrl(lat, lng)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warning hover:underline"
        >
          How to Get There
        </a>
      </p>
    </>
  );
};

export default EventMapModal;

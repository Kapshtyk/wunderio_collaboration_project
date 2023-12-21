import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import Bicycle from "@/styles/icons/bicycle.svg";
import Bus from "@/styles/icons/bus.svg";
import Car from "@/styles/icons/car.svg";
import Walk from "@/styles/icons/walk.svg";

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
    googleMapsApiKey: "AIzaSyAvUNynHkOr1Ubrd2WcR0hspWU372MVXCs",
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
        mapContainerStyle={{ height: "100%", width: "100%" }}
      >
        <MarkerF position={{ lat: markers.lat, lng: markers.lng }} />
      </GoogleMap>

      <div className="mx-auto flex justify-evenly max-w-2xl pt-4">
        <Link
          href={getDirectionsUrl(lat, lng) + "&travelmode=walking"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warning hover:underline"
        >
          <Walk className="inline-block text-main w-6 h-6 m-2" />
        </Link>
        <Link
          href={getDirectionsUrl(lat, lng) + "&travelmode=bicycling"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warning hover:underline"
        >
          <Bicycle className="inline-block text-main w-6 h-6 m-2" />
        </Link>
        <Link
          href={getDirectionsUrl(lat, lng) + "&travelmode=transit"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warning hover:underline"
        >
          <Bus className="inline-block text-main w-6 h-6 m-2" />
        </Link>
        <Link
          href={getDirectionsUrl(lat, lng) + "&travelmode=driving"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warning hover:underline"
        >
          <Car className="inline-block text-main w-6 h-6 m-2" />
        </Link>
      </div>
    </>
  );
};

export default EventMapModal;

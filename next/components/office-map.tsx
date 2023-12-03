import { absoluteUrl } from '@/lib/drupal/absolute-url';
import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { OfficeLocations } from '@/lib/zod/office-locations';
import { off } from 'process';

interface MapsProps {
    maps: OfficeLocations [],
  }

const OfficeLocationsMap = ({maps}: MapsProps) => {
    const [markers, setMarkers] = useState([]);

    useEffect(()=> {
        const newMarkers = maps.map((office) => ({
            position: {
                lat: office.field_address_coordinates.lat,
                lon: office.field_address_coordinates.lon,
            },
            title: office.title
        }));

        setMarkers(newMarkers);
    },[maps]);


  console.log('maps', maps);
  
 
  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY as string}>
      <GoogleMap
          center={markers.length > 0 ? markers[0].position :{lat:0, lng:0}}
          zoom={14}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
        {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} title={marker.title} />
          ))}
        </GoogleMap>
   </LoadScript>
    </div>
  );
};

export default OfficeLocationsMap;

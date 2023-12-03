import { absoluteUrl } from '@/lib/drupal/absolute-url';
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const OfficeLocations = () => {
  const [officeLocations, setOfficeLocations] = useState([]);

  useEffect(() => {
    const fetchOfficeLocations = async () => {
      try {
        const response = await fetch(absoluteUrl('/en/jsonapi/views/office_address_marker/block_1'));
        if (!response.ok) {
          throw new Error('Failed to fetch office locations from Drupal.');
        }
        const data = await response.json();
        setOfficeLocations(data.data || []);
      } catch (error) {
        console.error('Error fetching office locations:', error.message);
      }
    };

    fetchOfficeLocations();
  }, []);

  const markers = officeLocations.map(location => ({
    position: {
      lat: location.attributes.field_office_address.lat,
      lng: location.attributes.field_office_address.lon,
    },
    title: location.attributes.title,
  }));

 
  return (
    <div>
      <h2>Office Locations</h2>
      <LoadScript googleMapsApiKey='AIzaSyAPOAfyCoKl19xTBSbDeR20v2LkTCebaDE'>
      <GoogleMap
          center={markers.length > 0 ? markers[0].position : { lat: 0, lng: 0 }}
          zoom={13}
          mapContainerStyle={{ height: '400px', width: '100%' }}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} title={marker.title} />
          ))}
        </GoogleMap>
   </LoadScript>

   {officeLocations.map((office)=> (
    <div className='flex'>
        <div className='flex flex-col'>
        <h3>{office.attributes.field_address?.locality}</h3> 
       <p>{office.attributes.field_address?.address_line1}</p>
       <p>{office.attributes.field_address?.postal_code} <span>{office.attributes.field_address?.administrative_area}</span></p>
        </div>
    </div>
   ))}
    </div>
  );
};

export default OfficeLocations;

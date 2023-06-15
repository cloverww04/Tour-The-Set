/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useRef, useMemo } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import PropTypes from 'prop-types';
import { clientCredentials } from '../utils/client';

const googleKey = clientCredentials.googleApiKey;

function Map({ address }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleKey,
      version: 'weekly',
      libraries: ['places'], // Add the libraries option if needed
    });

    loader.load().then((google) => { // Pass the `google` object to the callback
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          const map = new google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 15,
          });
          const marker = new google.maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }, [address]);

  return <div style={{ height: '800px' }} ref={mapRef} />;
}

Map.propTypes = {
  address: PropTypes.string.isRequired,
};

export default Map;

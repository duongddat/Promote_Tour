import { useEffect, useRef } from "react";
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";

import GeoCoder from "./GeoCoder";
import { setLocation } from "../../store/location-slice";
import "./MapBox.css";

function MapBoxPoint() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);

  const mapRef = useRef();

  useEffect(() => {
    if (!location.lng && !location.lat) {
      fetch("https://ipapi.co/json")
        .then((response) => response.json())
        .then(async (data) => {
          const placeName = await reverseGeocode(data.longitude, data.latitude);
          mapRef.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          dispatch(
            setLocation({
              lng: data.longitude,
              lat: data.latitude,
              name: placeName,
            })
          );
        });
    }
  }, [dispatch, location]);

  const reverseGeocode = async (lng, lat) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${
        import.meta.env.VITE_MAP_BOX_KEY
      }`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].place_name;
    }
    return "Địa điểm không có tên";
  };

  const handleChangeLocation = async (event, type) => {
    let newLocation;
    if (type === "MARKER") {
      const { lngLat } = event;
      const placeName = await reverseGeocode(lngLat.lng, lngLat.lat);
      newLocation = { lng: lngLat.lng, lat: lngLat.lat, name: placeName };
    } else if (type === "GEO_LOCATE") {
      const { coords } = event;
      const placeName = await reverseGeocode(coords.longitude, coords.latitude);
      newLocation = {
        lng: coords.longitude,
        lat: coords.latitude,
        name: placeName,
      };
    }
    dispatch(setLocation(newLocation));
  };

  return (
    <>
      <MapGL
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX_KEY}
        initialViewState={{
          latitude: location.lat,
          longitude: location.lng,
          zoom: 10,
        }}
        style={{
          height: 400,
          transitionDuration: 200,
          borderRadius: 10,
          border: "1px solid #ccc",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <Marker
          latitude={location.lat}
          longitude={location.lng}
          draggable
          onDragEnd={(e) => handleChangeLocation(e, "MARKER")}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => handleChangeLocation(e, "GEO_LOCATE")}
        />
        <GeoCoder />
      </MapGL>
      <div className="text-center mt-3 map-location">
        <div className="map-location__group">
          {location.name && (
            <h5 className="map-location__name">{location.name}</h5>
          )}
          {location.lat && location.lng && (
            <p className="mapbox-location__point">
              {`(${location.lat} : ${location.lng})`}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default MapBoxPoint;

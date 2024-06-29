import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Fragment } from "react";

function MapBox({ locations, heightMap }) {
  return (
    <div className="map-container">
      <Map
        mapLib={import("mapbox-gl")}
        mapboxAccessToken={import.meta.env.VITE_MAP_BOX_KEY}
        style={{
          height: heightMap,
          transitionDuration: 200,
          borderRadius: 10,
          border: "1px solid #ccc",
        }}
        initialViewState={{
          longitude: `${locations[0].coordinates[1]}`,
          latitude: `${locations[0].coordinates[0]}`,
          zoom: 5,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        {locations.map((location, index) => (
          <Fragment key={index}>
            <Marker
              latitude={location.coordinates[0]}
              longitude={location.coordinates[1]}
              anchor="bottom"
            />
            <Popup
              latitude={location.coordinates[0]}
              longitude={location.coordinates[1]}
              closeButton={true}
              closeOnClick={false}
              offset={40}
              focusAfterOpen={false}
            >
              <span>
                Ngày {location.day}: {location.description}
              </span>
            </Popup>
          </Fragment>
        ))}
      </Map>
    </div>
  );
}

export default MapBox;

import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Fragment } from "react";

function MapBox({ locations, heightMap }) {
  return (
    <div className="map-container">
      <Map
        mapLib={import("mapbox-gl")}
        mapboxAccessToken="pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A"
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
        mapStyle="mapbox://styles/mapbox/streets-v9"
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

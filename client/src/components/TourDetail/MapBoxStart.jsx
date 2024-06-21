import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapBoxStart({ startLocation }) {
  return (
    <div className="map-container">
      <Map
        mapLib={import("mapbox-gl")}
        mapboxAccessToken="pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A"
        style={{
          height: 200,
          transitionDuration: 200,
          borderRadius: 10,
          border: "1px solid #ccc",
        }}
        initialViewState={{
          longitude: `${startLocation.coordinates[1]}`,
          latitude: `${startLocation.coordinates[0]}`,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          latitude={startLocation.coordinates[0]}
          longitude={startLocation.coordinates[1]}
          anchor="bottom"
        />
        <Popup
          latitude={startLocation.coordinates[0]}
          longitude={startLocation.coordinates[1]}
          closeButton={true}
          closeOnClick={false}
          offset={-10}
          focusAfterOpen={false}
        >
          <span>{startLocation.address}</span>
        </Popup>
      </Map>
    </div>
  );
}

export default MapBoxStart;

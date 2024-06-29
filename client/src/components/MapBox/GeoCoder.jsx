import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import { useDispatch } from "react-redux";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { setLocation } from "../../store/location-slice";
import "./MapBox.css";

function GeoCoder() {
  const dispatch = useDispatch();

  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_MAP_BOX_KEY,
    marker: false,
    collapsed: true,
    placeholder: "Nhập địa chỉ, thành phố, hoặc nơi bạn muốn tìm",
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    const placeName = e.result.place_name;
    dispatch(setLocation({ lng: coords[0], lat: coords[1], name: placeName }));
  });
  return null;
}

export default GeoCoder;

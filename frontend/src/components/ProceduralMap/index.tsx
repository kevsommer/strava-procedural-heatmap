import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ProceduralMap = ({ polylines }) => {
  const [displayedPolylines, setDisplayedPolylines] = useState([]);
  const interval = 500; // 500ms interval between mapping individual routes

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < polylines.length) {
        setDisplayedPolylines((prevState) => polylines.slice(0, index + 1));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [polylines]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {displayedPolylines.map((polyline, index) => (
        <Polyline key={index} positions={polyline} />
      ))}
    </MapContainer>
  );
};

export default ProceduralMap;

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapContent = ({
  polylines,
  interval,
}: {
  polylines: number[][][];
  interval: number;
}) => {
  const map = useMap();
  const [displayedPolylines, setDisplayedPolylines] = useState<number[][][]>(
    []
  );

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < polylines.length) {
        setDisplayedPolylines(polylines.slice(0, index + 1));
        index++;
        if (!map.getBounds().intersects(polylines[index])) {
          map.panTo(polylines[index][0]);
        }
      } else {
        clearInterval(intervalId);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [polylines]);

  return (
    <>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {displayedPolylines.map((polyline, index) => (
        <Polyline color={"red"} key={index} positions={polyline} />
      ))}
    </>
  );
};

const ProceduralMap = ({ polylines }: { polylines: number[][][] }) => {
  const [interval, setInterval] = useState(1000);
  if (polylines.length !== 0)
    return (
      <>
        <MapContainer
          center={polylines[0][0]}
          zoom={13}
        style={{ height: "100vh", width: "100vw" }}
        >
          <MapContent polylines={polylines} interval={interval} />
        </MapContainer>
      </>
    );
};

export default ProceduralMap;

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { decode } from "@googlemaps/polyline-codec";
import "leaflet/dist/leaflet.css";

const MapContent = ({
  polylines,
  interval,
}: {
  polylines: any[];
  interval: number;
}) => {
  const map = useMap();
  const [displayedPolylines, setDisplayedPolylines] = useState<number[][][]>(
    []
  );

  useEffect(() => {
    if (polylines.length === 0) return;
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < polylines.length) {
        setDisplayedPolylines(
          polylines.slice(0, index + 1).map((polyline) => polyline.polyline)
        );
        if (!map.getBounds().intersects(polylines[index].polyline)) {
          map.panTo(polylines[index].polyline[0]);
        }
        index++;
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

const ProceduralMap = ({ activities }: { activities: any[] }) => {
  const [interval, setInterval] = useState(500);
  const [polylines, setPolylines] = useState<any>([]);

  useEffect(() => {
    setPolylines(
      activities
        .filter(
          (activity: { map: { summary_polyline: string }; type: string }) =>
            activity.map.summary_polyline && activity.type === "Run"
        )
        .map(
          (activity: {
            map: { summary_polyline: string; polyline: string };
          }) => {
            return {
              ...activity,
              polyline: decode(activity.map.summary_polyline),
            };
          }
        )
        .filter((activity: { polyline: number[][] }) => activity.polyline)
    );
  }, [activities]);

  if (polylines.length !== 0) {
    return (
      <MapContainer
        center={polylines[0].polyline[0]}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
      >
        <MapContent polylines={polylines} interval={interval} />
      </MapContainer>
    );
  }
  return <div>Loading...</div>;
};

export default ProceduralMap;

// @ts-nocheck
import { useEffect, useState } from "react";
import { decode } from "@googlemaps/polyline-codec";
import { MapContainer } from "react-leaflet";
import Loading from "../../../../components/Loading";
import MapContent from "../MapContent";

const ProceduralMap = ({ activities }: { activities: any[] }) => {
  const [interval, setInterval] = useState(500);

  const polylines = activities
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
    .filter((activity: { polyline: number[][] }) => activity.polyline);

  if (polylines.length !== 0) {
    return (
      <MapContainer
        center={polylines[0].polyline[0]}
        zoom={13}
        style={{ height: "100vh", width: "100vw" }}
        doubleClickZoom={false}
      >
        <MapContent polylines={polylines} interval={interval} />
      </MapContainer>
    );
  }
  return <Loading />;
};

export default ProceduralMap;

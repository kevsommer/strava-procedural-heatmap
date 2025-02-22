// @ts-nocheck
import { useEffect, useState } from "react";
import { decode } from "@googlemaps/polyline-codec";
import { createControlComponent } from "@react-leaflet/core";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { formatDate } from "./utils";
import Loading from "../Loading";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const MapContent = ({
  polylines,
  interval,
}: {
  polylines: any[];
  interval: number;
}) => {
  const [displayIndex, setDisplayIndex] = useState(1);
  const map = useMap();

  useEffect(() => {
    if (polylines.length === 0) return;
    let index = 0;
    setDisplayIndex(1);
    const intervalId = setInterval(() => {
      if (index < polylines.length) {
        if (!map.getBounds().intersects(polylines[index].polyline)) {
          map.panTo(polylines[index].polyline[0]);
        }
        setDisplayIndex((prev) => prev + 1);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [polylines]);

  const TextControl = createControlComponent((props) => {
    const textControl = L.control(props);
    textControl.onAdd = () => {
      const container = L.DomUtil.create("div", "leaflet-bar");
      container.style.backgroundColor = "white";
      container.style.color = "black";
      container.style.fontWeight = "bold";
      container.style.fontSize = "1.5rem";
      container.style.padding = "10px";
      container.style.borderRadius = "5px";
      container.innerHTML = props.text;
      return container;
    };
    return textControl;
  });

  return (
    <>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polylines
        .slice(0, displayIndex + 1)
        .map((polyline) => polyline.polyline)
        .map((polyline, index) => (
          <Polyline color={"red"} key={index} positions={polyline} />
        ))}
      <TextControl
        position="topleft"
        text={`${polylines[displayIndex - 1].name} - ${
          Math.round(polylines[displayIndex - 1].distance / 10) / 100
        } km`}
      />

      <TextControl
        position="topleft"
        text={`${formatDate(polylines[displayIndex - 1].start_date_local)}`}
      />
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
  return <Loading />;
};

export default ProceduralMap;

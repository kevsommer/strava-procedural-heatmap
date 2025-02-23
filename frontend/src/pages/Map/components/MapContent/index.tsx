// @ts-nocheck
import { useState, useEffect } from 'react';
import { formatDate } from "./utils";
import { createControlComponent } from "@react-leaflet/core";
import { Polyline, TileLayer, useMap } from "react-leaflet";
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

  const mappedPolylines = polylines
        .slice(0, displayIndex + 1)
        .map((polyline) => polyline.polyline);

  return (
    <>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mappedPolylines
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

export default MapContent;

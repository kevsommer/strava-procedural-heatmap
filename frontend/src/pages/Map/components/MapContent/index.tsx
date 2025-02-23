// @ts-nocheck
import { formatDate, useMapAnimation, type Polyline } from "./utils";
import { createControlComponent } from "@react-leaflet/core";
import { Polyline, TileLayer } from "react-leaflet";
import "./MapContent.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContent = ({
  polylines,
  interval,
}: {
  polylines: Polylines[];
  interval: number;
}) => {
  const { mappedPolylines, displayIndex, isRunning, toggleRunningState} = useMapAnimation({polylines, interval});
 
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
      <div className="c-map-content__controls">
        <button className="c-map-content__control-button" onClick={toggleRunningState}>{ isRunning ? "Stop" : "Start" }</button>
      </div>
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

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
  const { mappedPolylines, displayIndex, setDisplayIndex, indexRef, isRunning, toggleRunningState } = useMapAnimation({ polylines, interval });

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

  function handlePrevClick() {
    indexRef.current = Math.max(indexRef.current - 1, 0);
    setDisplayIndex(Math.max(displayIndex - 1, 1));
  }

  function handleNextClick() {
    indexRef.current++;
    setDisplayIndex(displayIndex + 1);
  }

  return (
    <>
      <div className="c-map-content__controls">
        {!isRunning && <button className="c-map-content__control-button" onClick={handlePrevClick}>Prev</button>}
        <button className="c-map-content__control-button" onClick={toggleRunningState}>{isRunning ? "Stop" : "Start"}</button>
        {!isRunning && <button className="c-map-content__control-button" onClick={handleNextClick}>Next</button>}
      </div>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mappedPolylines
        .slice(0, -1)
        .map((polyline, index) => (
          <Polyline color={"red"} key={index} positions={polyline} />
        ))}
      <Polyline color={"purple"} weight={5} key="last" positions={mappedPolylines.at(-1)} />
      <TextControl
        position="topleft"
        text={`${polylines[displayIndex].name} - ${Math.round(polylines[displayIndex].distance / 10) / 100
          } km`}
      />

      <TextControl
        position="topleft"
        text={`${formatDate(polylines[displayIndex].start_date_local)}`}
      />
    </>
  );
};

export default MapContent;

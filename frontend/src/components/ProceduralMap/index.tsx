import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { decode } from "@googlemaps/polyline-codec";
import "leaflet/dist/leaflet.css";
import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based, add 1 and pad with a leading 0 if needed
  const day = ("0" + date.getDate()).slice(-2); // Pad with a leading 0 if needed

  const hours = ("0" + date.getHours()).slice(-2); // Pad with a leading 0 if needed
  const minutes = ("0" + date.getMinutes()).slice(-2); // Pad with a leading 0 if needed
  const seconds = ("0" + date.getSeconds()).slice(-2); // Pad with a leading 0 if needed

  // Format the date string as desired
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
};

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

  if (displayedPolylines.length !== 0)
    return (
      <>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {displayedPolylines.map((polyline, index) => (
          <Polyline color={"red"} key={index} positions={polyline} />
        ))}
        <TextControl
          position="topleft"
          text={`${polylines[displayedPolylines.length - 1].name} - ${
            Math.round(polylines[displayedPolylines.length - 1].distance / 10) /
            100
          } km`}
        />

        <TextControl
          position="topleft"
          text={`${formatDate(
            polylines[displayedPolylines.length - 1].start_date_local
          )}`}
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
  return <div>Loading...</div>;
};

export default ProceduralMap;

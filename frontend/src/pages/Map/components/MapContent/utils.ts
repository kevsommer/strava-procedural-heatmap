import { useState, useEffect, useRef } from 'react';
import { useMap } from "react-leaflet";

export type Polyline = {
  polyline: string
}

type MapAnimationParams = {
  polylines: Polyline[],
  interval: 500,
  isRunning: boolean;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0-based, add 1 and pad with a leading 0 if needed
  const day = ("0" + date.getDate()).slice(-2); // Pad with a leading 0 if needed

  const hours = ("0" + date.getHours()).slice(-2); // Pad with a leading 0 if needed
  const minutes = ("0" + date.getMinutes()).slice(-2); // Pad with a leading 0 if needed

  // Format the date string as desired
  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDate;
};

export const useMapAnimation = ({ polylines, interval }: MapAnimationParams) => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const isRunningRef = useRef(isRunning);
  const intervalRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const map = useMap();

  function toggleRunningState() {
    setIsRunning(prev => !prev);
    isRunningRef.current = !isRunningRef.current;
  }

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    if (polylines.length === 0) return;

    intervalRef.current = setInterval(() => {
      if (indexRef.current < polylines.length) {
        if (isRunningRef.current) {
          if (!map.getBounds().intersects(polylines[indexRef.current].polyline)) {
            map.panTo(polylines[indexRef.current].polyline[0]);
          }

          indexRef.current++;
          setDisplayIndex((prev) => prev + 1);
        }
      } else {
        clearInterval(intervalRef.current as number);
      }
    }, interval);

    return () => clearInterval(intervalRef.current as number);
  }, [polylines]);

  const mappedPolylines = polylines
    .slice(0, displayIndex + 1)
    .map((polyline) => polyline.polyline);

  return { mappedPolylines, displayIndex, setDisplayIndex, indexRef, isRunning, toggleRunningState };
};


import { useState, useEffect } from "react";
import ProceduralMap from "../../components/ProceduralMap";

function generateRandomCoordinate(center, radius) {
  const randomAngle = Math.random() * Math.PI * 2;
  const randomRadius = Math.random() * radius;
  const offsetX = randomRadius * Math.cos(randomAngle);
  const offsetY = randomRadius * Math.sin(randomAngle);
  const lat = center[0] + offsetY / 111111;
  const lng =
    center[1] + offsetX / (111111 * Math.cos((center[0] * Math.PI) / 180));
  return [lat, lng];
}

function generateSmallPolyline(center, length, radius) {
  const polyline = [];
  let currentPoint = center;

  for (let i = 0; i < length; i++) {
    currentPoint = generateRandomCoordinate(currentPoint, radius);
    polyline.push(currentPoint);
  }

  return polyline;
}

function generatePolylines(center, count, length, radius) {
  const polylines = [];

  for (let i = 0; i < count; i++) {
    polylines.push(generateSmallPolyline(center, length, radius));
  }

  return polylines;
}

const Map: React.FC = () => {
  const londonCoords = [51.5074, -0.1278];
  const polylineCount = 50;
  const polylineLength = 10;
  const radius = 1000;

  const polylines = generatePolylines(
    londonCoords,
    polylineCount,
    polylineLength,
    radius
  );

  return (
    <div>
      <h1>Map</h1>
      <ProceduralMap polylines={polylines} />
    </div>
  );
};

export default Map;

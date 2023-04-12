import "./App.css";
import Map from "./pages/Map";

function App() {
  const londonCoords = [51.5074, -0.1278];
  const polylineCount = 200;
  const polylineLength = 10;
  const radius = 1000;

  const polylines = generatePolylines(
    londonCoords,
    polylineCount,
    polylineLength,
    radius
  );

  return (
    <div className="App" style={{ width: "50vw" }}>
      <p>Procedural Map</p>
      <ProceduralMap polylines={polylines} />
    </div>
  );
}

export default App;

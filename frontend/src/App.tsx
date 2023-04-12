import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Map from "./pages/Map";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/map",
      element: <Map />,
    },
  ]);

  return (
    <div className="App" style={{ width: "50vw" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

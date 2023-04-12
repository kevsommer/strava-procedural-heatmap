import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { AuthContext } from "./context/AuthenticationProvider";
import Map from "./pages/Map";
import Auth from "./pages/Auth";
import Code from "./pages/Code";

function App() {
  const [authToken, setAuthToken] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const setToken = (data: string) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };

  const setExpireDate = (data: string) => {
    localStorage.setItem("expiresAt", JSON.stringify(data));
    setExpiresAt(data);
  };

  useEffect(() => {
    if (expiresAt) {
      if (Math.floor(Date.now() / 1000) > parseInt(expiresAt)) {
        setExpireDate("");
        setToken("");
      }
    }
  }, [expiresAt]);

  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Map />,
      loader: () => {
        if (authToken) {
          return <Map />;
        } else {
          return redirect("/code");
        }
      },
    },
    {
      path: "/map",
      element: <Map />,
      loader: () => {
        if (authToken) {
          return <Map />;
        } else {
          return redirect("/code");
        }
      },
    },
    {
      path: "/auth",
      element: <Auth />,
      loader: () => {
        if (authToken) {
          return redirect("/map");
        } else {
          return <Auth />;
        }
      },
    },
    {
      path: "/code",
      element: <Code />,
    },
  ]);

  return (
    <div className="App" style={{ width: "50vw" }}>
      <AuthContext.Provider
        value={{
          authToken,
          setAuthToken: setToken,
          expiresAt,
          setExpiresAt: setExpireDate,
        }}
      >
        <RouterProvider router={BrowserRouter} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;

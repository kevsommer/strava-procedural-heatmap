import { useState, useEffect } from "react";
import { decode } from "@googlemaps/polyline-codec";
import axios from "axios";
import ProceduralMap from "../../components/ProceduralMap";
import { useAuth } from "../../context/AuthenticationProvider";

const apiUrl = import.meta.env.VITE_API_URL;

const Map = () => {
  const { authToken, setAuthToken, setExpiresAt } = useAuth();
  const [polylines, setPolylines] = useState<number[][][]>([]);

  useEffect(() => {
    if (!authToken) {
      axios
        .get(`${apiUrl}`)
        .then((res) => window.location.replace(res.data.url));
    }
  }, [authToken, setAuthToken, setExpiresAt]);

  const getActivities = ({ page }: { page: number }) => {
    axios
      .get("https://www.strava.com/api/v3/activities", {
        params: {
          access_token: authToken,
          per_page: 200,
          page: page,
        },
      })
      .then((res) => {
        const decodedPolylines = res.data.map(
          (activity: { map: { summary_polyline: string } }) => {
            return decode(activity.map.summary_polyline);
          }
        );
        setPolylines([...polylines, ...decodedPolylines]);
        if (res.data.length === 200) {
          getActivities({ page: page + 1 });
        }
      });
  };

  useEffect(() => {
    if (authToken) {
      getActivities({ page: 1 });
      setPolylines(polylines.reverse());
    }
  }, [authToken]);

  return (
    <div>
      <h1>Map</h1>
      <ProceduralMap polylines={polylines} />
    </div>
  );
};

export default Map;

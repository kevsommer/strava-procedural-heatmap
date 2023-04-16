import { useState, useEffect } from "react";
import { decode } from "@googlemaps/polyline-codec";
import axios from "axios";
import ProceduralMap from "../../components/ProceduralMap";
import { useAuth } from "../../context/AuthenticationProvider";

const apiUrl = import.meta.env.VITE_API_URL;

const Map = () => {
  const { authToken, setAuthToken, setExpiresAt } = useAuth();
  const [ready, setReady] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (!authToken) {
      axios
        .get(`${apiUrl}`)
        .then((res) => window.location.replace(res.data.url));
    }
  }, [authToken, setAuthToken, setExpiresAt]);

  const getActivities = ({ page }: { page: number }) => {
    let fetchedActivities: any[] = [];

    const fetchActivitiesPage = (page: number) => {
      axios
        .get("https://www.strava.com/api/v3/activities", {
          params: {
            access_token: authToken,
            per_page: 200,
            page: page,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            fetchedActivities = [...res.data.reverse(), ...fetchedActivities];

            if (res.data.length === 200) {
              fetchActivitiesPage(page + 1);
            } else {
              setActivities(fetchedActivities);
              setReady(true);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching activities:", error);
        });
    };

    fetchActivitiesPage(page);
  };

  useEffect(() => {
    if (authToken) {
      getActivities({ page: 1 });
    }
  }, [authToken]);

  if (ready) return <ProceduralMap activities={activities} />;
  return <div />;
};

export default Map;

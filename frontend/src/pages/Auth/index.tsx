import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthenticationProvider";

const apiUrl = import.meta.env.VITE_API_URL;

const Auth = () => {
  const { authToken, setAuthToken, setExpiresAt } = useAuth();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");

    if (code) {
      axios
        .get(`${apiUrl}authorised/`, {
          params: { code: code },
        })
        .then((res) => {
          setAuthToken(res.data.access_token);
          setExpiresAt(res.data.expires_at);
        });
    }
  }, [setAuthToken, setExpiresAt]);

  useEffect(() => {
    if (authToken) {
      window.location.replace("/map");
    }
  }, [authToken]);

  return <div>Loading</div>;
};

export default Auth;

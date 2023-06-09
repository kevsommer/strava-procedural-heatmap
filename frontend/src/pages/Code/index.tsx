import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthenticationProvider";
import Loading from "../../components/Loading";

const apiUrl = import.meta.env.VITE_API_URL;

const Code = () => {
  const { authToken, setAuthToken, setExpiresAt } = useAuth();

  useEffect(() => {
    if (!authToken) {
      axios.get(`${apiUrl}`).then((res) => {
        console.log("res.data.url", res.data.url);
        window.location.replace(res.data.url);
      });
    }
  }, [authToken, setAuthToken, setExpiresAt]);

  return <Loading />;
};

export default Code;

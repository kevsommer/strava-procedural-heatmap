import { useEffect } from "react";
import { useAuth } from "../../context/AuthenticationProvider";
import axios from "axios";
import Loading from "../../components/Loading";

const apiUrl = import.meta.env.VITE_API_URL;

const Code = () => {
  const { authToken, setAuthToken, setExpiresAt } = useAuth();

  useEffect(() => {
    if (!authToken) {
      axios.get(`${apiUrl}`).then((res) => {
        window.location.replace(res.data.url);
      });
    }
  }, [authToken, setAuthToken, setExpiresAt]);

  return <Loading />;
};

export default Code;

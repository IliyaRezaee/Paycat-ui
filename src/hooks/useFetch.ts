import { useState, useEffect } from "react";
import axios from "axios";
import { Tag } from "../types";

interface ResponseData {
  status: "Ok" | "Error";
  text: string;
  tag: Tag;
}

function useFetch(text: string) {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>("");

  useEffect(() => {
    (async () => {
      if (text.length === 0) return;
      setLoading(true);
      setData(null);
      setError("");

      try {
        const res = await axios.post(
          import.meta.env.VITE_SERVER_URL,
          { text },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        setData(res.data);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    })();
  }, [text]);

  return { data, loading, error };
}
export default useFetch;

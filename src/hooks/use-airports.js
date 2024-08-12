import { useEffect, useState } from "react";
import apiClient from "../utils/helpers/api-client";

const useAirports = () => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await apiClient.get('airports');
        setAirports(response.data.data)
      } catch (error) {
        console.error('Error fetching airports:', error)
      }
    }
    fetchAirports()
  }, [])

  return { airports };
}

export default useAirports;

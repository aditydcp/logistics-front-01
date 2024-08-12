import { useEffect, useState } from "react";
import apiClient from "../utils/helpers/api-client";

const useExporters = () => {
  const [exporters, setExporters] = useState([]);

  useEffect(() => {
    const fetchExporters = async () => {
      try {
        const response = await apiClient.get('exporters');
        setExporters(response.data.data)
      } catch (error) {
        console.error('Error fetching exporters:', error)
      }
    }
    fetchExporters()
  }, [])

  return { exporters };
}

export default useExporters;
import { useEffect, useState } from "react";
import apiClient from "../utils/helpers/api-client";

const useImporters = () => {
  const [importers, setImporters] = useState([]);

  useEffect(() => {
    const fetchImporters = async () => {
      try {
        const response = await apiClient.get('importers');
        setImporters(response.data.data)
      } catch (error) {
        console.error('Error fetching importers:', error)
      }
    }
    fetchImporters()
  }, [])

  return { importers };
}

export default useImporters;
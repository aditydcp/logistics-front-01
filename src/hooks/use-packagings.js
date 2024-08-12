import { useEffect, useState } from "react";
import apiClient from "../utils/helpers/api-client";

const usePackagings = () => {
  const [packagings, setPackagings] = useState([]);

  useEffect(() => {
    const fetchPackagings = async () => {
      try {
        const response = await apiClient.get('packagings');
        setPackagings(response.data.data)
      } catch (error) {
        console.error('Error fetching packagings:', error)
      }
    }
    fetchPackagings()
  }, [])

  return { packagings };
}

export default usePackagings;

import { useEffect, useState } from "react";
import apiClient from "../utils/helpers/api-client";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('categories');
        setCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return { categories };
}

export default useCategories;

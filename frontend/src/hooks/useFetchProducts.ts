import { useState, useEffect, useRef } from 'react';
import axios from '@/services/api/axiosConfig';

type productT = {
  id: string;
  product: string;
  description: string;
  img: string;
  price: number;
  category: string;
}

const useFetchData = () => {
  const [data, setData] = useState<productT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const effectRun = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios<productT[]>('/products', {
            withCredentials: true
        });

        if (!response.data) {
          throw new Error('A lekérdezés nem sikerült.');
        } 

        setData(response.data);
      } catch (error: any) {
        setError(error.message || 'Hiba történt a lekérdezés során.');
      } finally {
        setLoading(false);
      }
    };

    if (effectRun.current) {
        fetchData();
    }
    
    return () => {
        effectRun.current = true;
    };

  }, []);

  return { data, loading, error };
};

export default useFetchData;


import { useState, useEffect } from 'react';
import { geocodeAddress } from '@/utils/geocode';
import { haversineDistance } from '@/utils/distance';

export const useDistance = (hometown: string) => {
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateDistance = async () => {
      try {
        const hanoverCoords = { lat: 43.7022, lng: -72.2896 }; // Hanover, NH
        const hometownCoords = await geocodeAddress(hometown);
        const calculatedDistance = haversineDistance(
          hanoverCoords.lat,
          hanoverCoords.lng,
          hometownCoords.lat,
          hometownCoords.lng
        );
        setDistance(calculatedDistance);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    calculateDistance();
  }, [hometown]);

  return { distance, loading, error };
};

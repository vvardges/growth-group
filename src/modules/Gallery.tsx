import React, { useEffect, useState } from 'react';

import MasonryGrid from '@/components/MasonryGrid';

const fetchPhotos = async () => {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
  const response = await fetch('https://api.pexels.com/v1/curated?per_page=20', {
    method: 'GET',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  const data = await response.json();
  return data.photos; // Return only the list of photos
};

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPhotos = await fetchPhotos();
        setPhotos(
          fetchedPhotos.map((photo) => ({
            src: photo.src.medium,
            aspectRatio: photo.width / photo.height,
            id: photo.id,
          })),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading1...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <MasonryGrid items={photos} />
    </div>
  );
};

export default Gallery;

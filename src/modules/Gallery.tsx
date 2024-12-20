import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@/components/Grid';
import { fetchPhotos } from '@/fetchUtils';
import Loader from '../components/Loader';

const Gallery: React.FC = () => {
  const navigate = useNavigate();

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
            avgColor: photo.avg_color,
            onClick: () => navigate(`/photo/${photo.id}`),
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
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Grid items={photos} />
    </>
  );
};

export default Gallery;

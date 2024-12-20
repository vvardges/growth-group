import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@/components/Grid';
import { fetchPhotos } from '@/fetchUtils';
import type { GridItemType } from '@/components/Grid/types';
import type { fetchedPhotoType } from '@/fetchUtils.ts';
import Layout from '@/components/Layout';

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<GridItemType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedPhotos = await fetchPhotos();
      setPhotos((prevPhotos: GridItemType[]) => [
        ...prevPhotos,
        ...fetchedPhotos.map((photo: fetchedPhotoType) => ({
          src: photo.src.medium,
          aspectRatio: photo.width / photo.height,
          id: Math.random(),
          avgColor: photo.avg_color,
          onClick: () => navigate(`/photo/${photo.id}`),
        })),
      ]);
    } catch (err) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout loading={loading} error={error}>
      <Grid items={photos} onLoadMore={fetchData} isLoading={loading} />
    </Layout>
  );
};

export default Gallery;

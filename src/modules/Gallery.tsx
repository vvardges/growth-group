import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@/components/Grid';
import { fetchPhotos } from '@/fetchUtils';
import Loader from '@/components/Loader';
import type {GridItemType} from "@/components/Grid/types";
import type {PhotoType} from "@/fetchUtils.ts";

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<GridItemType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const fetchedPhotos = await fetchPhotos();
      setPhotos((prevPhotos: GridItemType[]) => [
        ...prevPhotos,
        ...fetchedPhotos.map((photo: PhotoType) => ({
          src: photo.src.medium,
          aspectRatio: photo.width / photo.height,
          id: Math.random(),
          avgColor: photo.avg_color,
          onClick: () => navigate(`/photo/${photo.id}`),
        })),
      ]);
    } catch (err) {
      //setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {loading && <Loader />}
      <Grid items={photos} onLoadMore={fetchData} isLoading={loading} />
    </>
  );
};

export default Gallery;

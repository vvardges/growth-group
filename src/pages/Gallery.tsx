import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@/components/Grid';
import { getPhotos, searchPhotos, fetchMorePhotos } from '@/fetchUtils';
import type { GridItemType } from '@/components/Grid/types';
import type { fetchedPhotoType } from '@/fetchUtils.ts';
import Layout from '@/components/Layout';
import Search from '@/components/Search';

const mapFetchedPhoto = (photo: fetchedPhotoType) => {
  return {
    src: photo.src.medium,
    aspectRatio: photo.width / photo.height,
    id: photo.id,
    avgColor: photo.avg_color,
    key: Math.random(),
  };
};

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<GridItemType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInitialData = async (query?: string | undefined) => {
    setLoading(true);
    try {
      const fetchedPhotos = query
        ? await searchPhotos(query)
        : await getPhotos();
      setPhotos(fetchedPhotos.map(mapFetchedPhoto));
    } catch (err) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    setLoading(true);
    try {
      const fetchedPhotos = await fetchMorePhotos();

      setPhotos((prevPhotos: GridItemType[]) => [
        ...prevPhotos,
        ...fetchedPhotos.map(mapFetchedPhoto),
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
    fetchInitialData();
  }, []);

  const handleItemClick = useCallback(
    (id: number) => {
      navigate(`/photo/${id}`);
    },
    [navigate],
  );

  return (
    <Layout loading={loading} error={error}>
      <Search onSubmit={(query) => fetchInitialData(query)} />
      <Grid
        items={photos}
        onItemClick={handleItemClick}
        onLoadMore={fetchMoreData}
        isLoading={loading}
      />
    </Layout>
  );
};

export default Gallery;

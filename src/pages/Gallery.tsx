import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { GridItemType } from '@/components/Grid/types';
import type { fetchedPhotoType } from '@/fetchUtils.ts';

import Grid from '@/components/Grid';
import Layout from '@/components/Layout';
import Search from '@/components/Search';
import { DEFAULT_GRID_CONFIGS, PHOTOS_PER_PAGE } from '@/constants';
import { getPhotos, searchPhotos, fetchMorePhotos } from '@/fetchUtils';

const mapFetchedPhoto = (photo: fetchedPhotoType, index: number) => {
  return {
    src: photo.src,
    aspectRatio: photo.width / photo.height,
    id: photo.id,
    avgColor: photo.avg_color,
    key: Math.random(),
    isCritical: index < PHOTOS_PER_PAGE,
  };
};

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const [photos, setPhotos] = useState<GridItemType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const preloadLinks: HTMLLinkElement[] = [];
    photos.forEach((photo) => {
      const preloadLink = document.createElement('link');
      preloadLinks.push(preloadLink);
      preloadLink.rel = 'preload';
      preloadLink.href = photo.src.medium;
      preloadLink.as = 'image';

      document.head.appendChild(preloadLink);
    });

    return () => {
      preloadLinks.forEach((preloadLink) =>
        document.head.removeChild(preloadLink),
      );
    };
  }, [photos]);

  const fetchInitialData = async (query?: string | undefined) => {
    setLoading(true);
    try {
      const fetchedPhotos = query
        ? await searchPhotos(query)
        : await getPhotos();

      setPhotos(fetchedPhotos.map(mapFetchedPhoto));
    } catch (err) {
      if (err instanceof Error && err.message && err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = useCallback(async () => {
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
  }, []);

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
        {...DEFAULT_GRID_CONFIGS}
        items={photos}
        onItemClick={handleItemClick}
        onLoadMore={fetchMoreData}
      />
    </Layout>
  );
};

export default Gallery;

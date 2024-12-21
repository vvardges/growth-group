import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { CardProps } from '@/components/Card/types';

import Card from '@/components/Card';
import Layout from '@/components/Layout';
import { getPhoto } from '@/fetchUtils';

const Photo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [details, setDetails] = useState<CardProps>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async (id: string) => {
      try {
        const fetchedPhoto = await getPhoto(id);
        setDetails({
          imageUrl: fetchedPhoto.src.original,
          photographerName: fetchedPhoto.photographer,
          photographerLink: fetchedPhoto.photographer_url,
          description: fetchedPhoto.alt,
        });
      } catch (err) {
        if (err instanceof Error && err.message) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <Layout loading={loading} error={error}>
      {details && <Card {...details} onClose={() => navigate(-1)} />}
    </Layout>
  );
};

export default Photo;

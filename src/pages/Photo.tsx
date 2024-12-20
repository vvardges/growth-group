import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchPhoto } from '@/fetchUtils';
import type { PhotoType } from '@/fetchUtils';
import Layout from "@/components/Layout";

const Photo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<PhotoType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchData = async (id: string) => {
      try {
        const fetchedPhoto = await fetchPhoto(id);
        setPhoto(fetchedPhoto);
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
      <button onClick={() => navigate(-1)}>Close</button>
      {photo && (
        <img
          src={photo.src.original}
          alt={`Photo ${id}`}
          width="100%"
          height="100%"
        />
      )}
    </Layout>
  );
};

export default Photo;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchPhoto } from '@/fetchUtils';
import Loader from '../components/Loader';
import type {PhotoType} from "@/fetchUtils";

const Photo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<PhotoType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const fetchedPhoto = await fetchPhoto(id);
        setPhoto(fetchedPhoto);
      } catch (err) {
        //setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData(id);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Photo {id}</h1>
      <button onClick={() => navigate(-1)}>Close</button>
      {photo && <img
        src={photo.src.original}
        alt={`Photo ${id}`}
        width="100%"
        height="100%"
      />}
    </div>
  );
};

export default Photo;

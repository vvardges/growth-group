const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const URL = 'https://api.pexels.com/v1/';

const PHOTOS_PER_PAGE = 60;

export interface fetchedPhotoType {
  id: number;
  src: {
    medium: string;
    original: string;
  };
  width: number;
  height: number;
  avg_color: number;
  alt: string;
}

const fetchFromPexels = (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: API_KEY,
    },
  });
};

export const getPhotos = async () => {
  const response = await fetchFromPexels(
    `${URL}curated?per_page=${PHOTOS_PER_PAGE}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  const { photos, next_page } = await response.json();
  return { photos, next_page };
};

export const searchPhotos = async (query: string) => {
  const response = await fetchFromPexels(
    `${URL}search?query=${query}&per_page=${PHOTOS_PER_PAGE}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  const { photos, next_page } = await response.json();
  return { photos, next_page };
};

export const getPhoto = async (id: string) => {
  const response = await fetchFromPexels(`${URL}photos/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  return await response.json();
};

export const fetchMorePhotos = async (url: string) => {
  const response = await fetchFromPexels(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  const { photos, next_page } = await response.json();
  return { photos, next_page };
};

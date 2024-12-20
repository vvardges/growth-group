const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const URL = 'https://api.pexels.com/v1/';

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

let fetchPhotosUrl = `${URL}curated?per_page=600`;
export const fetchPhotos = async () => {
  const response = await fetchFromPexels(fetchPhotosUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  const { photos, next_page } = await response.json();
  fetchPhotosUrl = next_page;
  return photos;
};

export const fetchPhoto = async (id: string) => {
  const response = await fetchFromPexels(`${URL}photos/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  return await response.json();
};

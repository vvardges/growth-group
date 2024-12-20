const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const fetchFromPexels = (params: string) => {
  return fetch(`https://api.pexels.com/v1/${params}`, {
    method: 'GET',
    headers: {
      Authorization: API_KEY,
    },
  });
};

export const fetchPhotos = async () => {
  const response = await fetchFromPexels('curated?per_page=30');

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  const {photos} = await response.json();
  return photos;
};

export const fetchPhoto = async (id: string) => {
  const response = await fetchFromPexels(`photos/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data from Pexels API');
  }

  return await response.json();
};

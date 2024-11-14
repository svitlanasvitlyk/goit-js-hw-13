import axios from 'axios';

// We need to export function that create http search on backend
export async function fetchPhotos(params) {
  const response = await axios.get('https://pixabay.com/api/', { params });
  console.log(response.config.url);
  return response.data;
}

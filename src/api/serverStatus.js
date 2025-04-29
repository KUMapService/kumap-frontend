import { kyInstance } from '@api/ky';
import { API } from '@constants/route';

export const fetchServerStatus = async () => {
  console.log('Starting fetchServerStatus, API.SERVER_STATUS:', API.SERVER_STATUS);
  try {
    const response = await kyInstance.get(API.SERVER_STATUS);
    const data = await response.json();
    return { ...data, status: response.status };
  } catch (error) {
    console.error('Error in fetchServerStatus:', error);
    throw error;
  }
};

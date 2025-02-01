import { instance } from './axios';
import { API } from '../constants/route';

export const fetchServerStatus = () => {
  return instance.get(API.SERVER_STATUS);
};

import {CustomResponse} from '../interfaces';
import {customFetch} from './fetch';
import * as SecureStore from 'expo-secure-store';

const getAuthConfig = async () => {
  const jwt = await SecureStore.getItemAsync('session');
  const authConfig = {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  };
  return authConfig;
};

const TopicService = () => {
  const getActiveTopics = async (id: string): Promise<CustomResponse<any>> => {
    const authConfig = await getAuthConfig();
    return await customFetch<any>(
      `topic/client-side/allTopics/${id}`,
      'GET',
      '',
      authConfig,
    );
  };

  return {
    getActiveTopics,
  };
};

export default TopicService();

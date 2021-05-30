import {ReqOptions, CustomResponse} from '../interfaces/index';
import axios from 'axios';
import {URL} from '../constants/ngrok';

const customFetch = <T>(
  path: string,
  reqType: string,
  body?: any,
  config?: any,
): Promise<CustomResponse<T>> => {
  const reqOptions: ReqOptions = {
    POST: async function () {
      try {
        console.log(`${URL}/${path}`, body, config);
        const serverRes = await axios.post(
          `${URL}/${path}`,
          JSON.stringify(body),
          config,
        );
        return {serverRes, error: false};
      } catch (e) {
        return {serverRes: e.response.data, error: true};
      }
    },
    GET: async function () {
      try {
        const serverRes = await axios.get(`${URL}/${path}`, config);
        return {serverRes, error: false};
      } catch (e) {
        return {serverRes: e.response.data, error: true};
      }
    },
  };
  if (!reqOptions[reqType]) {
    throw new Error('Invalid request type');
  }
  return reqOptions[reqType]();
};

export {customFetch};

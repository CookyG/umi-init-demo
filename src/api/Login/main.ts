import { Login } from './api';

import {
  resultfulGet,
  resultfulPost,
  resultfulPut,
  resultfulDelete,
  post,
  get,
} from '@/axiosConfig/index';

export default {
  GetType(params: {}) {
    return get(Login.GetType, params);
  },
  GetProjectStatus(params?: any) {
    return get(Login.GetProjectStatus, params);
  },
};

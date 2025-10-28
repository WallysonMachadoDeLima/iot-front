'use client';

import axios from 'axios';



export const LOCAL_API = 'http://localhost:8085';

const api = {
  next: axios.create({
    baseURL: `${LOCAL_API}/api`,
  }),
};


export { api };


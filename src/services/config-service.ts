'use client';

import axios from 'axios';

// ----------------------------------------------------------------------

export const LOCAL_API = process.env.NEXT_PUBLIC_LOCAL_API;

const api = {
  next: axios.create({
    baseURL: `${LOCAL_API}/api`,
  }),
};


export { api };


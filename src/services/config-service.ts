'use client';

import axios from 'axios';

// ----------------------------------------------------------------------
const isDevelopment = process.env.NODE_ENV === 'development';

let host = '';

if (typeof window !== 'undefined') {
  const url = new URL(window.location.href);
  host = url.hostname.toString().substring(0, url.hostname.toString().indexOf('.br') + 3);
}

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API;

export const LOCAL_API = process.env.NEXT_PUBLIC_LOCAL_API;

export const HOST_API_LOCAL = isDevelopment
  ? process.env.NEXT_PUBLIC_DEV_API
  : `https://${host || ''}`;

// ----------------------------------------------------------------------

const api = {
  auth: axios.create({
    baseURL: `${HOST_API}`,
  }),
  cashway: axios.create({
    baseURL: `${HOST_API}/cashway`,
  }),
  banners: axios.create({
    baseURL: `${HOST_API}/banners`,
  }),
  bonbonniere: axios.create({
    baseURL: `${HOST_API}/bonbonniere`,
  }),
  business: axios.create({
    baseURL: `${HOST_API}/business`,
  }),
  locus: axios.create({
    baseURL: `${HOST_API}/locus`,
  }),
  movies: axios.create({
    baseURL: `${HOST_API}/movies`,
  }),
  people: axios.create({
    baseURL: `${HOST_API}/people`,
  }),
  suppliers: axios.create({
    baseURL: `${HOST_API}/suppliers`,
  }),
  specta: axios.create({
    baseURL: `${HOST_API}/specta`,
  }),
  user: axios.create({
    baseURL: `${HOST_API}/users`,
  }),
  next: axios.create({
    baseURL: `${LOCAL_API}/api`,
  }),
};


export { api };

'use client';

import { HOST_API } from '@/services/config-service';
import axios from 'axios';

// ----------------------------------------------------------------------

async function create(values: Record<string, any>) {
  const response = await axios.post(
    `${HOST_API}/people/access/business`,
    values,
    {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    },
  );
  return response.data;
}

export const LoginService = {
  create,
};

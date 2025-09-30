'use client';

import { api } from '@/services/config-service';

// ----------------------------------------------------------------------

async function findAll(search?: string): Promise<any> {
  const response = await api.bonbonniere.post(
    `/ncm/filter?search=${
      search || ''
    }&page=0&linesPerPage=10&orderBy=codigoFormatado&direction=DESC`,
  );
  return response.data;
}

export const NCMService = {
  findAll,
};

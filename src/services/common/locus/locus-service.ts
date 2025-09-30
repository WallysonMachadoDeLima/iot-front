'use client';

import { getSessionItem, setSessionItem } from '@/utils';

import { api } from '@/services/config-service';

// ----------------------------------------------------------------------

async function findAllPais(): Promise<any> {
  const sessionData = getSessionItem('context-integracoes-pais');
  if (sessionData) return sessionData;

  const response = await api.locus.get(`/pais`);

  setSessionItem('context-integracoes-pais', response.data);
  return response.data;
}

async function findAllEstado(): Promise<any> {
  const sessionData = getSessionItem('context-integracoes-estado');
  if (sessionData) return sessionData;

  const response = await api.locus.get(`/uf`);

  setSessionItem('context-integracoes-estado', response.data);
  return response.data;
}

async function findAllCidadeByIdEstado(estado: any): Promise<any> {
  const sessionData = getSessionItem(`context-integracoes-cidade-estado-${estado}`);
  if (sessionData) return sessionData;

  const response = await api.locus.get(`/cidades?uf=${estado}`);

  setSessionItem(`context-integracoes-cidade-estado-${estado}`, response.data);
  return response.data;
}

async function findOneCidadeById(id: any): Promise<any> {
  const sessionData = getSessionItem(`context-integracoes-cidade-${id}`);
  if (sessionData) return sessionData;

  const response = await api.locus.get(`/cidade/${id}`);

  setSessionItem(`context-integracoes-cidade-${id}`, response.data);
  return response.data;
}

async function findOneEnderecoByCep(cep: any): Promise<any> {
  const sessionData = getSessionItem(`context-integracoes-cep-${cep}`);
  if (sessionData) return sessionData;

  const response = await api.locus.get(`/cep?cep=${cep}`);

  setSessionItem(`context-integracoes-cep-${cep}`, response.data);
  return response.data;
}

export const LocusService = {
  findAllPais,
  findAllEstado,
  findAllCidadeByIdEstado,
  findOneCidadeById,
  findOneEnderecoByCep,
};

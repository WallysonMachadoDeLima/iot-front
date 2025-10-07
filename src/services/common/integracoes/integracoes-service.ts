'use client';

import { IIntegracoesFinanca, IIntegracoesPessoa } from '@/models';
import { getSessionItem, setSessionItem } from '@/utils';

import { api } from '@/services/config-service';

// ----------------------------------------------------------------------

async function bonbonniereContext(): Promise<any> {
  const sessionData = getSessionItem('context-integracoes-bonboniere');

  if (sessionData) return sessionData;

  const response = await api.bonbonniere.get(`/integracao/context`);

  setSessionItem('context-integracoes-bonboniere', response.data);

  return response.data;
}

async function financaContext(): Promise<IIntegracoesFinanca> {
  const sessionData = getSessionItem('context-integracoes-financa');
  if (sessionData) return sessionData;

  const response = await api.cashway.get(`/integracao/context`);

  setSessionItem('context-integracoes-financa', response.data);
  return response.data;
}

async function pessoaContext(): Promise<IIntegracoesPessoa> {
  const sessionData = getSessionItem('context-integracoes-pessoa');
  if (sessionData) return sessionData;

  const response = await api.people.get(`/integracao/context`);

  setSessionItem('context-integracoes-pessoa', response.data);
  return response.data;
}

export const IntegracoesService = {
  bonbonniereContext,
  financaContext,
  pessoaContext,
};

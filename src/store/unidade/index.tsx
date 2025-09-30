import { create } from 'zustand';

import { getLocalItem, setLocalItem } from '@/utils/storage';

interface Props {
  state: {
    unidade: { id: number; nome: string } | any;
  };
  actions: {
    create: (unidade: any) => void;
    remove: () => void;
  };
}

export const useUnidade = create<Props>((set) => ({
  state: {
    unidade: getLocalItem('unidade') || undefined,
  },
  actions: {
    create: (unidade: any) => {
      set({ state: { unidade: unidade } });
      setLocalItem('unidade', unidade);
    },
    remove: () => {
      set({ state: undefined });
      setLocalItem('unidade', '');
    },
  },
}));

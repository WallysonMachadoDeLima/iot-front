// ----------------------------------------------------------------------

import { ca } from "date-fns/locale";

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
    },
    contabil: {
      fiscal: {
        notaFiscal: {
          create: `${ROOTS.DASHBOARD}/contabil/fiscal/nota-fiscal/create`,
          list: `${ROOTS.DASHBOARD}/contabil/fiscal/nota-fiscal/list`,
          edit: (id: string | number) =>
            `${ROOTS.DASHBOARD}/contabil/fiscal/nota-fiscal/${id}/edit`,
        },
        parametro: {
          edit: `${ROOTS.DASHBOARD}/contabil/fiscal/parametro/edit`,
        },
        downloads: `${ROOTS.DASHBOARD}/contabil/fiscal/downloads`,
        serieNfe: {
          create: `${ROOTS.DASHBOARD}/contabil/fiscal/serie-nfe/create`,
          list: `${ROOTS.DASHBOARD}/contabil/fiscal/serie-nfe/list`,
          edit: (ambiente: string | number, modelo: string | number, serie: string | number) =>
            `${ROOTS.DASHBOARD}/contabil/fiscal/serie-nfe/edit?ambiente=${ambiente}&modelo=${modelo}&serie=${serie}`,
        },
        regraTributaria: {
          create: `${ROOTS.DASHBOARD}/contabil/fiscal/regra-tributaria/create`,
          list: `${ROOTS.DASHBOARD}/contabil/fiscal/regra-tributaria/list`,
          edit: (id: string | number) =>
            `${ROOTS.DASHBOARD}/contabil/fiscal/regra-tributaria/${id}/edit`,
          view: (id: string | number) =>
            `${ROOTS.DASHBOARD}/contabil/fiscal/regra-tributaria/${id}/viewer`,
        },
      },
    },
    estoque: {
      mercadoria: {
        create: `${ROOTS.DASHBOARD}/estoque/mercadoria/create`,
        list: `${ROOTS.DASHBOARD}/estoque/mercadoria/list`,
        edit: (id: string | number) => `${ROOTS.DASHBOARD}/estoque/mercadoria/${id}/edit`,
        configuracaoEntrada: {
          create: `${ROOTS.DASHBOARD}/estoque/mercadoria/configuracao-entrada/create`,
          list: `${ROOTS.DASHBOARD}/estoque/mercadoria/configuracao-entrada/list`,
          edit: (id: string | number) => `${ROOTS.DASHBOARD}/estoque/mercadoria/configuracao-entrada/${id}/edit`,
        },
      },
      movimentacao: {
        list: `${ROOTS.DASHBOARD}/estoque/movimentacao/list`,
        viewer: (id: string | number) => `${ROOTS.DASHBOARD}/estoque/movimentacao/${id}/viewer`,
      },
      combo: {
        list: `${ROOTS.DASHBOARD}/estoque/combo/list`,
        edit: (id: string | number) => `${ROOTS.DASHBOARD}/estoque/combo/${id}/edit`,
      },
      solicitacaoAjuste: {
        create: `${ROOTS.DASHBOARD}/estoque/solicitacao-ajuste/create`,
        list: `${ROOTS.DASHBOARD}/estoque/solicitacao-ajuste/list`,
        edit: (id: string | number) => `${ROOTS.DASHBOARD}/estoque/solicitacao-ajuste/${id}/edit`,
      },
    },

    estabelecimento: {
      relatorio: {
        caixa: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/caixa`,
        exibicao: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/exibicao`,
        fiscal: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/fiscal`,
        ingresso: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/ingresso`,
        produto: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/produto`,
        rendaBordero: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/rendaBordero`,
        venda: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/venda`,
        estoque: `${ROOTS.DASHBOARD}/estabelecimento/relatorio/estoque`,
      },
      painelDigital: {
        create: `${ROOTS.DASHBOARD}/estabelecimento/painel-digital/create`,
        list: `${ROOTS.DASHBOARD}/estabelecimento/painel-digital/list`,
        edit: (id: string | number) =>
          `${ROOTS.DASHBOARD}/estabelecimento/painel-digital/${id}/edit`,
      },
    },

    exibicao: {
      scb: {
        bilheteria: {
          list: `${ROOTS.DASHBOARD}/exibicao/scb/bilheteria/list`,
          viewer: (id: string | number) => `${ROOTS.DASHBOARD}/exibicao/scb/bilheteria/${id}/viewer`,
        },
        calendario: {
          list: `${ROOTS.DASHBOARD}/exibicao/scb/calendario/list`,
          newEdit: (year: string | number, month: string | number) =>
            `${ROOTS.DASHBOARD}/exibicao/scb/calendario/eventos/${year}/${month}`,  
        },
      }
    },
  },
};

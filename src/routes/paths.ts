


const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};



export const paths = {
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/login`,
      register: `${ROOTS.AUTH}/register`,
      forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
    },
    infraestrutura: {
      tipoLocal: {
        create: `${ROOTS.DASHBOARD}/tipo-local/create`,
        list: `${ROOTS.DASHBOARD}/tipo-local/list`,
        edit: (id: string | number) => `${ROOTS.DASHBOARD}/tipo-local/${id}/edit`,
        viewer: (id: string | number) => `${ROOTS.DASHBOARD}/tipo-local/${id}/viewer`,
      },
      localizacao: {
        create: `${ROOTS.DASHBOARD}/localizacao/create`,
        list: `${ROOTS.DASHBOARD}/localizacao/list`,
        edit: (id: string | number) => `${ROOTS.DASHBOARD}/localizacao/${id}/edit`,
        viewer: (id: string | number) => `${ROOTS.DASHBOARD}/localizacao/${id}/viewer`,
      },
    },
  }
};

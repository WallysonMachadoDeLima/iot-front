// ----------------------------------------------------------------------


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
      sala: {
        create: `${ROOTS.DASHBOARD}/sala/create`,
        list: `${ROOTS.DASHBOARD}/sala/list`,
        edit: (id: string | number) => `${ROOTS.DASHBOARD}/sala/${id}/edit`,
        view: (id: string | number) => `${ROOTS.DASHBOARD}/sala/${id}/view`,

      }
    }

  },
};

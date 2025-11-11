import { create } from "lodash";



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
    item: {
      create: `${ROOTS.DASHBOARD}/item/create`,
      list: `${ROOTS.DASHBOARD}/item/list`,
      edit: (id: string | number) => `${ROOTS.DASHBOARD}/item/${id}/edit`,
      viewer: (id: string | number) => `${ROOTS.DASHBOARD}/item/${id}/viewer`,
    },
    dispositivo: {
      create: `${ROOTS.DASHBOARD}/dispositivo/create`,
      list: `${ROOTS.DASHBOARD}/dispositivo/list`,
      edit: (id: string | number) => `${ROOTS.DASHBOARD}/dispositivo/${id}/edit`,
      viewer: (id: string | number) => `${ROOTS.DASHBOARD}/dispositivo/${id}/viewer`,
    },
    movimento:{
      create: `${ROOTS.DASHBOARD}/movimento/create`,
      list: `${ROOTS.DASHBOARD}/movimento/list`,
      edit: (id: string | number) => `${ROOTS.DASHBOARD}/movimento/${id}/edit`,
      viewer: (id: string | number) => `${ROOTS.DASHBOARD}/movimento/${id}/viewer`,
    }
  }
};

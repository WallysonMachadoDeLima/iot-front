'use client';

import { useSnackbar } from '@/components/snackbar';

interface ErrorResponse {
  response?: {
    status: number;
    data?: {
      statusCode?: number;
      message?: string;
    };
  };
  message?: string;
}

export const useError = () => {
  const { enqueueSnackbar } = useSnackbar();

  return (error?: ErrorResponse, currentMsg?: string): any => {
    if (error && error.message === 'Network Error') {
      return enqueueSnackbar('Há problemas de conexão com a internet.', {
        variant: 'error',
      });
    }

    if (error?.response?.data) {
      let messageFinal: string = '';
      let statusCodeFinal: number = 0;

      const { statusCode, message } = error.response.data;

      if (message) {
        messageFinal = message;
      } else if (currentMsg) {
        messageFinal = currentMsg;
      } else {
        messageFinal = `Serviço indisponível: ${
          statusCode || error?.response?.status || 'desconhecido'
        }`;
      }

      statusCodeFinal = statusCode || error?.response?.status || 500;

      return enqueueSnackbar(messageFinal, {
        variant: statusCodeFinal >= 500 ? 'error' : 'warning',
      });
    } else {
      console.error(error);
      return enqueueSnackbar('Erro desconhecido', {
        variant: 'error',
      });
    }
  };
};

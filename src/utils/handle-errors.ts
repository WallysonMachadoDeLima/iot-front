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

export const handleErrors = (error?: ErrorResponse, currentMsg?: string): string => {
  // Verificando se o erro é um erro de conexão
  if (error && error.message === 'Network Error') {
    return 'Há problemas de conexão com a internet.';
  }

  // Verificando se a resposta da API está disponível
  if (error?.response?.data) {
    const { statusCode, message } = error.response.data;

    // Se a mensagem da API estiver disponível, retorná-la
    if (message) return message;

    // Se uma mensagem personalizada foi fornecida, retorná-la
    if (currentMsg) return currentMsg;

    // Caso contrário, retornar uma mensagem genérica com o código de status
    return `Serviço indisponível: ${statusCode || error?.response?.status || 'desconhecido'}`;
  }

  // Se o erro não se encaixar em nenhum dos casos acima, retornar uma mensagem de erro genérica
  return 'Erro não identificado';
};

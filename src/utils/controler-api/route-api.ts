export function assembleParameterArray(obj: any, prefixo = '') {
  let partes: any = [];
  function iterarObjeto(objeto: any, prefixoAtual: string) {
    for (let chave in objeto) {
      if (objeto.hasOwnProperty(chave)) {
        let valor = objeto[chave];
        // Ignora valores null, undefined, ou strings vazias
        if (valor === null || valor === undefined || valor === '') continue;

        if (Array.isArray(valor) && valor?.length > 0) {
          // Trata arrays
          partes.push(`${prefixoAtual}${chave}=$in:${valor.join(',')}`);
        } else if (typeof valor === 'object') {
          // Continua a iteração recursiva para objetos
          iterarObjeto(valor, `${prefixoAtual}${chave}.`);
        } else {
          // Adiciona valores que não são objetos ou arrays

          partes.push(`${prefixoAtual}${chave}=${chave === 'page' ? valor - 1 : encodeURIComponent(valor)}`);
        }
      }
    }
  }
  iterarObjeto(obj, prefixo ? `${prefixo}.` : '');
  return partes.join('&');
}

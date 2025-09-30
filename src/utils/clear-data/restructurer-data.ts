export const removeEmptyFields = (
  obj: Record<string, any>,
  fieldsToSkip: string[] = [],
): Record<string, any> => {
  for (const prop in obj) {
    if (fieldsToSkip.includes(prop as string)) {
      continue;
    }

    const value = obj[prop];

    if (value === null) {
      delete obj[prop];
    } else if (value !== undefined) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        removeEmptyFields(value, fieldsToSkip);

        if (Object.keys(value).length === 0) {
          delete obj[prop];
        }
      } else if (typeof value === 'string' && (value === '' || value.trim() === '')) {
        delete obj[prop];
      }
    }
  }
  return obj;
};

export const removeFieldsNotUpdated = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
  ignoreProperties: string[] = [],
): Record<string, any> => {
  const diffObj: Record<string, any> = {};

  for (const prop in obj1) {
    if (typeof obj2[prop] === 'undefined') {
      diffObj[prop] = obj1[prop];
    } else if (
      typeof obj1[prop] === 'object' &&
      typeof obj2[prop] === 'object' &&
      !Array.isArray(obj1[prop]) &&
      !Array.isArray(obj2[prop])
    ) {
      const nestedDiff = removeFieldsNotUpdated(obj1[prop], obj2[prop]);
      if (Object.keys(nestedDiff).length > 0) {
        diffObj[prop] = nestedDiff;
      }
    } else if (Array.isArray(obj1[prop]) && Array.isArray(obj2[prop])) {
      if (JSON.stringify(obj1[prop]) !== JSON.stringify(obj2[prop])) {
        diffObj[prop] = obj2[prop];
      }
    } else if (obj1[prop] !== obj2[prop]) {
      diffObj[prop] = obj2[prop];
    }
  }

  for (const prop in obj2) {
    if (typeof obj1[prop] === 'undefined') {
      diffObj[prop] = obj2[prop];
    }
  }

  for (const prop of ignoreProperties) {
    if (typeof obj2[prop] !== 'undefined') {
      diffObj[prop] = obj2[prop];
    }
  }

  return diffObj;
};

export const removeUnnecessaryFieldsUpdate = (obj = {}) => {
  let { contato, endereco, ...rest }: any = obj;
  if (contato) {
    const { id, ...restContato } = contato;
    contato = restContato;
  }
  if (endereco) {
    const { id, cidade, ...restEndereco } = endereco;

    if (cidade) {
      const { id } = cidade;
      endereco = { ...restEndereco, cidade: { id: id } };
    }
  }
  return { ...rest, contato, endereco };
};

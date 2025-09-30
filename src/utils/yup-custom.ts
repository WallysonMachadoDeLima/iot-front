import { cnpj as CNPJ, cpf as CPF } from 'cpf-cnpj-validator';
import * as yup from 'yup';

import { fNumber } from './format-data';

// ----------------------------------------------------------------------

declare module 'yup' {
  interface StringSchema {
    cpfOrCnpj(message?: string): StringSchema;
  }
}

// ----------------------------------------------------------------------

function cpfOrCnpjValidation(value: any): boolean {
  if (value) {
    const numericValue = value.replace(/[^\d]+/g, '');
    if (numericValue.length === 11) {
      return CPF.isValid(value);
    } else if (numericValue.length === 14) {
      return CNPJ.isValid(value);
    }
  }
  return true;
}

yup.addMethod(yup.string, 'cpfOrCnpj', function (message: string = 'CPF ou CNPJ inválido') {
  return this.test('cpfOrCnpj', message, cpfOrCnpjValidation);
});

// ----------------------------------------------------------------------

type InputValue = 'number-required' | 'number';

function yupCustom(validation: InputValue, text?: string) {
  const message = text ? `${text} é obrigatório` : 'Campo é obrigatório';
  switch (validation) {
    case 'number-required':
      return yup
        .mixed()
        .required(message)
        .test('is-number', message, (value) => {
          if (value !== undefined && value !== null && value !== '') {
            return typeof fNumber('float', value) === 'number';
          }
          return false;
        });

    case 'number':
      return yup.mixed();
    default:
      return yup.string();
  }
}

const Yup = {
  ...yup,

  custom: yupCustom,
};

export { Yup };

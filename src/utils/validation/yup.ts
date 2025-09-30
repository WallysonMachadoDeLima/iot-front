import { fNumber, Mask } from '@/utils';
import { cnpj as CNPJ, cpf as CPF } from 'cpf-cnpj-validator';
import * as yup from 'yup';

// ----------------------------------------------------------------------

declare module 'yup' {
  interface StringSchema {
    cpf(message?: string): StringSchema;
    cnpj(message?: string): StringSchema;
    cpfOrCnpj(message?: string): StringSchema;
    telefoneCelular(message?: string): StringSchema;
    cep(message?: string): StringSchema;
    email(message?: string): StringSchema;

    /**
     * Sobrescreve o método `required` para aceitar o nome do campo ou uma mensagem personalizada.
     * @param message Ou nome do campo.
     */
    required(fieldName: string): StringSchema;
    required(message: string): StringSchema;
  }

  interface Yup {
    /**
     * Sobrescreve o método `string` para opcionalmente aceitar o nome do campo.
     * @param fieldName (Opcional) Nome do campo.
     */
    string(fieldName?: string): StringSchema;
    string(): StringSchema;
  }
}

const originalStringRequired = yup.string.prototype.required;

const originalMixedRequired = yup.mixed.prototype.required;

const originalMixedNonNullable = yup.mixed.prototype.nonNullable;

yup.string.prototype.required = function (...args: any[]): yup.StringSchema {
  if (args.length === 1 && typeof args[0] === 'string') {
    const fieldName = args[0];
    // Chama o método `required` original com a mensagem personalizada
    // função que conta aas repetiçoes da palava 'é obrigatório' na string fieldName
    const count = fieldName.match(/é obrigatório/g)?.length || 0;

    if (count >= 1) {
      const indexFirst = fieldName.indexOf('é obrigatório');
      return originalStringRequired.call(
        this,
        fieldName.toString().substring(0, indexFirst) + 'é obrigatório',
      );
    }

    return originalStringRequired.call(this, `${fieldName} é obrigatório`);
  }

  // Caso contrário, utiliza a implementação original com os argumentos fornecidos
  return originalStringRequired.apply(this, args as any);
};

yup.mixed.prototype.required = function (...args: any[]): yup.MixedSchema {
  if (args.length === 1 && typeof args[0] === 'string') {
    const fieldName = args[0];
    const count = fieldName.match(/é obrigatório/g)?.length || 0;

    if (count >= 1) {
      const indexFirst = fieldName.indexOf('é obrigatório');
      return originalMixedRequired.call(
        this,
        fieldName.toString().substring(0, indexFirst) + 'é obrigatório',
      );
    }

    return originalMixedRequired.call(this, `${fieldName} é obrigatório`);
  }

  // Caso contrário, utiliza a implementação original com os argumentos fornecidos
  return originalMixedRequired.apply(this, args as any);
};

yup.mixed.prototype.nonNullable = function (...args: any[]): yup.MixedSchema {
  if (args.length === 1 && typeof args[0] === 'string') {
    const fieldName = args[0];
    const count = fieldName.match(/é obrigatório/g)?.length || 0;

    if (count >= 1) {
      const indexFirst = fieldName.indexOf('é obrigatório');
      return originalMixedNonNullable.call(
        this,
        fieldName.toString().substring(0, indexFirst) + 'é obrigatório',
      );
    }

    return originalMixedNonNullable.call(this, `${fieldName} é obrigatório`);
  }

  // Caso contrário, utiliza a implementação original com os argumentos fornecidos
  return originalMixedNonNullable.apply(this, args as any);
};

// ----------------------------------------------------------------------

yup.addMethod(yup.string, 'cpf', function (message: string = 'CPF inválido') {
  return this.test('cpf', message, (value) => {
    return CPF.isValid(value as string);
  });
});

yup.addMethod(yup.string, 'cnpj', function (message: string = 'CNPJ inválido') {
  return this.test('cnpj', message, (value) => {
    return CNPJ.isValid(value as string);
  });
});

function cpfOrCnpjValidation(value: any): boolean {
  if (value) {
    const numericValue = value.replace(/[^\d]+/g, '');
    if (numericValue.length <= 11) {
      return CPF.isValid(value);
    } else if (numericValue.length > 11) {
      return CNPJ.isValid(value);
    }
  }
  return true;
}

yup.addMethod(yup.string, 'cpfOrCnpj', function (message: string = 'CPF ou CNPJ inválido') {
  return this.test('cpfOrCnpj', message, cpfOrCnpjValidation);
});

yup.addMethod(
  yup.string,
  'telefoneCelular',
  function (message: string = 'Telefone celular incompleto') {
    return this.test('has-full-telefone', message, (value) => {
      if (!value) return true;
      return Mask.unmasked(value).length >= 10;
    });
  },
);

yup.addMethod(yup.string, 'cep', function (message: string = 'CEP incompleto') {
  return this.test('cep', message, (value) => {
    if (!value) return true;
    return Mask.unmasked(value).length < 8;
  });
});

yup.addMethod(yup.string, 'email', function (message: string = 'E-mail inválido') {
  return this.test('email', message, (value) => {
    if (!value) return true;
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  });
});

// ----------------------------------------------------------------------

const number = () => {
  const required = (message: string) => {
    return yup
      .mixed()
      .required(`${message} é obrigatório`)
      .test('is-number', `${message} é obrigatório`, (value) => {
        if (value !== undefined && value !== null && value !== '') {
          return typeof fNumber('float', value) === 'number';
        }
        return false;
      });
  };

  const test = (nomeFunction: string, message: string, callback: (value: any) => boolean) => {
    return yup.mixed().test(nomeFunction, message, callback);
  };

  const optional = () => {
    return yup.mixed().optional();
  };

  const nullable = () => {
    return yup.mixed().nullable();
  };

  return {
    required,
    optional,
    test,
    nullable,
  };
};

// ----------------------------------------------------------------------

const Yup = {
  ...yup,
  number,
};

export { Yup };

import { ITipoLocalCreateEdit } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { TipoLocalDefaultValues } from './localizacao-default-values';
import { tipoLocalValidationShema } from './localizacao-validation-shema';



export const TipoLocalResolver = (currentForm?: ITipoLocalCreateEdit) => {
  return useForm({
    resolver: yupResolver(tipoLocalValidationShema),
    defaultValues: TipoLocalDefaultValues(currentForm),
  });
};

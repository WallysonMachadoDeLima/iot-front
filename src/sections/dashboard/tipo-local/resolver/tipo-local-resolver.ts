import { ITipoLocalCreateEdit } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { TipoLocalDefaultValues } from './tipo-local-default-values';
import { tipoLocalValidationShema } from './tipo-local-validation-shema';



export const TipoLocalResolver = (currentForm?: ITipoLocalCreateEdit) => {
  return useForm({
    resolver: yupResolver(tipoLocalValidationShema),
    defaultValues: TipoLocalDefaultValues(currentForm),
  });
};

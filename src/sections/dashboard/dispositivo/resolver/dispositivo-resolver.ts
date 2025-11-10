import { IDispositivoCreateEdit } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { DispositivoDefaultValues } from './dispositivo-default-values';
import { dispositivoValidationShema } from './dispositivo-validation-shema';

export const DispositivoResolver = (currentForm?: IDispositivoCreateEdit) => {
  return useForm({
    resolver: yupResolver(dispositivoValidationShema),
    defaultValues: DispositivoDefaultValues(currentForm),
  });
};

import { ISalaCreateEdit } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { SalaDefaultValues } from './sala-default-values';
import { salaValidationShema } from './sala-validation-shema';

// ----------------------------------------------------------------------

export const SalaResolver = (currentForm?: ISalaCreateEdit) => {
  return useForm({
    resolver: yupResolver(salaValidationShema),
    defaultValues: SalaDefaultValues(currentForm),
  });
};

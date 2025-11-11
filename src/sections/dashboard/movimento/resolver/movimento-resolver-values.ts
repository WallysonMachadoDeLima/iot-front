import { IMovimentoCreateEdit } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { MovimentoDefaultValues } from './movimento-default-values';
import { movimentoValidationShema } from './movimento-valitation-schema';



export const MovimentoResolver = (currentForm?: IMovimentoCreateEdit) => {
  return useForm({
    resolver: yupResolver(movimentoValidationShema),
    defaultValues: MovimentoDefaultValues(currentForm),
  });
};

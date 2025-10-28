import { ILocalizacaoCreateEdit } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LocalizacaoDefaultValues } from './localizacao-default-values';
import { localizacaoValidationShema } from './localizacao-validation-shema';



export const LocalizacaoResolver = (currentForm?: ILocalizacaoCreateEdit) => {
  return useForm({
    resolver: yupResolver(localizacaoValidationShema),
    defaultValues: LocalizacaoDefaultValues(currentForm),
  });
};

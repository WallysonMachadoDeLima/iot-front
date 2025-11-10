
import { IItemCreateEdit } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ItemDefaultValues } from './item-default-values';
import { itemValidationShema } from './item-validation-shema';

export const ItemResolver = (currentForm?: IItemCreateEdit) => {
  return useForm({
    resolver: yupResolver(itemValidationShema),
    defaultValues: ItemDefaultValues(currentForm),
  });
};

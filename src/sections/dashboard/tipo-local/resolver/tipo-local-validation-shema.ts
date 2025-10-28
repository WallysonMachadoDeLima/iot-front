import { Yup } from '@/utils';



export const informacoesValidationShema = Yup.object().shape({
  id_tipolocal: Yup.number().optional(),
  descricao: Yup.string().required('Descrição'),
});

export const tipoLocalValidationShema = Yup.object().shape({
  ...informacoesValidationShema.fields,
});


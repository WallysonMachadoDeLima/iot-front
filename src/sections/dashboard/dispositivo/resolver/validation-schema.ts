import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  identificador: Yup.string().required('Identificador é obrigatório'),
  descricao: Yup.string().nullable(),
  tipo: Yup.string().required('Tipo é obrigatório'),
  ativo: Yup.number().default(1),
  fk_id_local: Yup.number().required('Localização é obrigatória').min(1, 'Localização é obrigatória'),
});
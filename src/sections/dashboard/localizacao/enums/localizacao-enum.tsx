import IconBedge from '@/components/icon-badge';



const formTabs = [
  {
    value: 'informacoes',
    label: 'Informações do Tipo de Local',
    icon: <IconBedge>1</IconBedge>,
  },
];

const tableHeader = [
  { label: 'ID', sx: { width: '10%' } },
  { label: 'Descrição', sx: { width: 0 }, align: 'center' },
  { label: 'Ações', sx: { width: '1%' } },
];

export const TIPO_LOCAL_ENUM = {
  formTabs,
  tableHeader,
};

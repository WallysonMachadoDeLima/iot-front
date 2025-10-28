import IconBedge from '@/components/icon-badge';



const formTabs = [
  {
    value: 'informacoes',
    label: 'Informações do Localização',
    icon: <IconBedge>1</IconBedge>,
  },
];

const tableHeader = [
  { label: 'ID', sx: { width: '10%' } },
  { label: 'Nome', sx: { width: 0 }, align: 'center' },
  { label: 'Ações', sx: { width: '1%' } },
];

export const TIPO_LOCAL_ENUM = {
  formTabs,
  tableHeader,
};

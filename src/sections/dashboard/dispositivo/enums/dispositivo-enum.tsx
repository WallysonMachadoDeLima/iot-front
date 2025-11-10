import IconBedge from '@/components/icon-badge';

const formTabs = [
  {
    value: 'informacoes',
    label: 'Informações do Dispositivo',
    icon: <IconBedge>1</IconBedge>,
  },
];

const tableHeader = [
  { label: 'ID', sx: { width: '10%' } },
  { label: 'Identificador', align: 'center' },
  { label: 'Descrição', align: 'center' },
  { label: 'Tipo', align: 'center' },
  { label: 'Ações', sx: { width: '1%' } },
];

export const DISPOSITIVO_ENUM = {
  formTabs,
  tableHeader,
};

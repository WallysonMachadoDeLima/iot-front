import IconBedge from '@/components/icon-badge';

// ----------------------------------------------------------------------

const formTabs = [
  {
    value: 'informacoes',
    label: 'Informações da Sala',
    icon: <IconBedge>1</IconBedge>,
  },
];

const tableHeader = [
  { label: 'ID', sx: { width: '10%' } },
  { label: 'Nome', sx: { width: '30%' } },
  { label: 'Descrição', sx: { width: 0 }, align: 'center' },
  { label: 'Ações', sx: { width: '1%' } },
];

export const SALA_ENUM = {
  formTabs,
  tableHeader,
};

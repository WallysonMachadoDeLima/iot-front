import IconBedge from '@/components/icon-badge';



const formTabs = [
  {
    value: 'informacoes',
    label: 'Informações da Movimentação',
    icon: <IconBedge>1</IconBedge>,
  },
];

const tableHeader = [
  { label: 'ID', sx: { width: '10%' } },
  { label: 'Descrição', sx: { width: 0 }, align: 'center' },
  { label: 'Ações', sx: { width: '1%' } },
];

export const MOVIMENTO_ENUM = {
  formTabs,
  tableHeader,
};


import IconBedge from '@/components/icon-badge';

const formTabs = [
  {
    value: 'informacoes',
    label: 'Informações do Item',
    icon: <IconBedge>1</IconBedge>,
  },
];

const tableHeader = [
  { label: 'ID', sx: { width: '10%' } },
  { label: 'Tag', sx: { width: '20%' }, align: 'center' },
  { label: 'Nome', sx: { width: '40%' }, align: 'center' },
  { label: 'Local', sx: { width: '30%' }, align: 'center' },
  { label: 'Ações', sx: { width: '1%' } },
];

export const ITEM_ENUM = {
  formTabs,
  tableHeader,
};

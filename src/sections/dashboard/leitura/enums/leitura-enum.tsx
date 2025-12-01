import IconBedge from '@/components/icon-badge';

const formTabs = [
    {
        value: 'informacoes',
        label: 'Informações da Leitura',
        icon: <IconBedge>1</IconBedge>,
    },
];

const tableHeader = [
    { label: 'ID', sx: { width: '3%' }, align: 'center' },
    { label: 'Tag', sx: { width: '12%' }, align: 'center' },
    { label: 'Item', sx: { width: '15%' }, align: 'center' },
    { label: 'Dispositivo', sx: { width: '15%' }, align: 'center' },
    { label: 'Data/Hora', sx: { width: '12%' }, align: 'center' },
    { label: 'Ações', sx: { width: '5%' } },
];

export const LEITURA_ENUM = {
    formTabs,
    tableHeader,
};

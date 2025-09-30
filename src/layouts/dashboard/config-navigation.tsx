// icons
import { useMemo } from 'react';

import Iconify from '@/components/iconify';
import SvgColor from '@/components/svg-color';
// locales
import { useLocales } from '@/theme/locales';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
const iconFy = (name: string) => (
  <Iconify icon={`solar:${name}-bold-duotone`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: icon('ic_dashboard'),
  fiscal: icon('ic_banking'),
  mercadorias: icon('ic_delivery'),
  movimentacao: iconFy('upload'),
  solicitacaoAjuste: icon('ic_notebook-bookmark'),
  combo: icon('ic_cart'),
  painelDigital: icon('ic_kanban'),

  ingresso: icon('ic_ticket'),
  suprimento: icon('ic_notebook-bookmark'),
  distribuidor: icon('ic_reel'),
  filme: icon('ic_clapperboard_open_play'),
  banner: icon('ic_kanban'),
  relatorio: icon('ic_file'),
  cliente: icon('ic_user'),
  fornecedor: icon('ic_delivery'),
  produto: icon('ic_order'),
  scb: icon('ic_videocamera'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: t('Gestão'),
        roles: ['admin', 'gerente', 'supervisor'],
        items: [
          {
            title: t('salas'),
            path: '#disabled',
            icon: ICONS.fiscal,
            roles: ['admin', 'gerente', 'supervisor'],
          },
          {
            title: t('itens'),
            path: '#disabled',
            icon: ICONS.mercadorias,
            roles: ['admin', 'gerente', 'supervisor'],
          },
        ],
      },
    ],
    [t],
  );

  return data;
}

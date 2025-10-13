import { useMemo } from 'react';
import { paths } from '@/routes';

import SvgColor from '@/components/svg-color';
import { useLocales } from '@/theme/locales';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  sala: icon('ic_banking'),
  mercadorias: icon('ic_delivery'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: t('Gestão'),

        items: [
          {
            title: t('salas'),
            path: paths.dashboard.sala.list,
            icon: ICONS.sala,
          },
          {
            title: t('itens'),
            path: '#disabled',
            icon: ICONS.mercadorias,
          },
        ],
      },
    ],
    [t],
  );

  return data;
}

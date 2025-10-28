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
        subheader: t('infraestrutura'),

        items: [
          {
            title: t('salas'),
            path: paths.dashboard.infraestrutura.sala.list,
            icon: ICONS.sala,
          },
        ],
      },
    ],
    [t],
  );

  return data;
}

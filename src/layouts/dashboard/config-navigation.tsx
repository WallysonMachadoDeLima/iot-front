import { paths } from '@/routes';
import { useMemo } from 'react';

import SvgColor from '@/components/svg-color';
import { useLocales } from '@/theme/locales';



const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  tipoLocal: icon('ic_banking'),
  localizacao: icon('ic_delivery'),
};



export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: t('infraestrutura'),
        items: [
          {
            title: t('tipo local'),
            path: paths.dashboard.infraestrutura.tipoLocal.list,
            icon: ICONS.tipoLocal,
          },
          {
            title: t('localizacao'),
            path: paths.dashboard.infraestrutura.localizacao.list,
            icon: ICONS.localizacao,
          },
        ],
      },
    ],
    [t],
  );

  return data;
}

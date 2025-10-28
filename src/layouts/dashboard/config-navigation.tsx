import { paths } from '@/routes';
import { useMemo } from 'react';
import { FaMapLocation } from "react-icons/fa6";
import { MdLocalOffer } from "react-icons/md";

import { useLocales } from '@/theme/locales';

const ICONS = {
  tipoLocal: <MdLocalOffer />,
  localizacao: <FaMapLocation />,
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
            path: paths.dashboard.tipoLocal.list,
            icon: ICONS.tipoLocal,
          },
          {
            title: t('localizacao'),
            path: paths.dashboard.localizacao.list,
            icon: ICONS.localizacao,
          },
        ],
      },
    ],
    [t],
  );

  return data;
}

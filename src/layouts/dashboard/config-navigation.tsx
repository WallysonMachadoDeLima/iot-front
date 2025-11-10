import { paths } from '@/routes';
import { useMemo } from 'react';
import { FaMapLocation } from "react-icons/fa6";
import { MdLocalOffer, MdOutlineInventory } from "react-icons/md";
import { IoIosApps } from "react-icons/io";

import { useLocales } from '@/theme/locales';

const ICONS = {
  tipoLocal: <MdLocalOffer />,
  localizacao: <FaMapLocation />,
  dispositivo: <IoIosApps />,
  item: <MdOutlineInventory />,
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
          {
            title: t('dispositivos'),
            path: paths.dashboard.dispositivo.list,
            icon: ICONS.dispositivo,
          },
          {
            title: t('itens'),
            path: paths.dashboard.item.list,
            icon: ICONS.item,
          },
        ],
      },
    ],
    [t],
  );

  return data;
}

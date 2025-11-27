import { paths } from '@/routes';
import { useLocales } from '@/theme/locales';
import { useMemo } from 'react';
import { BiScan } from "react-icons/bi";
import { IoIosApps } from "react-icons/io";
import { LuMapPinned } from "react-icons/lu";
import { MdOutlineDeveloperBoard, MdOutlineLocalOffer } from "react-icons/md";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TbHomeMove, TbReportAnalytics } from "react-icons/tb";

const ICONS = {
  dashboard: <RiDashboardHorizontalLine />,
  relatorio: <TbReportAnalytics />,
  movimento: <TbHomeMove />,
  leitura: <BiScan />,
  item: <IoIosApps />,
  dispositivo: <MdOutlineDeveloperBoard />,
  localizacao: <LuMapPinned />,
  tipoLocal: <MdOutlineLocalOffer />,
};

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        subheader: t('overview'),
        items: [
          {
            title: t('dashboard'),
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
          {
            title: t('relatórios'),
            path: paths.dashboard.relatorio.create,
            icon: ICONS.relatorio,
          },
          {
            title: t('movimentação'),
            path: paths.dashboard.movimento.list,
            icon: ICONS.movimento,
          },
          {
            title: t('Leituras'),
            path: paths.dashboard.leitura.list,
            icon: ICONS.leitura,
          },
        ],
      },
      {
        subheader: t('equipamentos'),
        items: [
          {
            title: t('itens'),
            path: paths.dashboard.item.list,
            icon: ICONS.item,
          },
          {
            title: t('dispositivos'),
            path: paths.dashboard.dispositivo.list,
            icon: ICONS.dispositivo,
          },
        ],
      },
      {
        subheader: t('Localizações'),
        items: [
          {
            title: t('locais'),
            path: paths.dashboard.localizacao.list,
            icon: ICONS.localizacao,
          },
          {
            title: t('tipo local'),
            path: paths.dashboard.tipoLocal.list,
            icon: ICONS.tipoLocal,
          },
        ],
      },

    ],
    [t],
  );

  return data;
}

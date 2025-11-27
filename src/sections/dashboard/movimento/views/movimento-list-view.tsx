'use client';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { RHFFormProvider } from '@/components/hook-form';
import Scrollbar from '@/components/scrollbar';
import { useSettingsContext } from '@/components/settings';
import {
  TableActions,
  TableFilter,
  TableNoData,
  TablePagination,
  useTableLocal,
} from '@/components/table';
import { useError } from '@/hooks';
import { IMovimentoFindAll } from '@/models';
import { paths, useRouter } from '@/routes';
import { fDateTime } from '@/utils/format-time';
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import { MdOutlineNoteAlt } from "react-icons/md";

import { movimentoService } from '@/services';
import { MOVIMENTO_ENUM } from '../enums';

const REFRESH_INTERVAL = 1500;

export function MovimentoListView() {
  const router = useRouter();
  const handleError = useError();
  const settings = useSettingsContext();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { methods, localFilteringPaging } = useTableLocal<IMovimentoFindAll>();

  const { setValue, watch } = methods;

  const { dense, dataTableFilter, linesPerPage, page, search, tab } = watch();

  const fetchData = () => localFilteringPaging('ativo');

  const loadMovimentos = useCallback(() => {
    movimentoService
      .findAll()
      .then((response: any[]) => setValue('dataTable', response))
      .catch((error: any) => handleError(error, 'Serviço de Movimentação indisponível'));
  }, [setValue, handleError]);

  const handleEdit = (item: IMovimentoFindAll) => {
    router.push(paths.dashboard.movimento.edit(item.id_movimento));
  };

  const handleView = (item: IMovimentoFindAll) => {
    router.push(paths.dashboard.movimento.viewer(item.id_movimento));
  };

  useEffect(() => {
    fetchData();
  }, [linesPerPage, page, search, tab]);

  // Auto-refresh: carrega dados inicialmente e configura intervalo
  useEffect(() => {
    // Carrega dados imediatamente
    loadMovimentos();

    // Configura auto-refresh
    intervalRef.current = setInterval(() => {
      loadMovimentos();
    }, REFRESH_INTERVAL);

    // Cleanup: limpa o intervalo quando o componente for desmontado
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RHFFormProvider methods={methods}>
        <CustomBreadcrumbs
          heading="Listagem de Movimentação"
          links={[
            { name: 'Painel', href: paths.dashboard.root },
            {
              name: 'Movimentação',
              href: paths.dashboard.movimento.list,
            },
            { name: 'Lista' },
          ]}

        />
        <Card>
          <TableFilter />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 650 }} size={dense ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    {MOVIMENTO_ENUM.tableHeader.map((item) => (
                      <TableCell key={item.label} {...(item as TableCellProps)}>
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTableFilter.sort(
                    (a, b) => b.id_movimento - a.id_movimento
                  )?.map((item) => {
                    return (
                      <TableRow hover key={item.id_movimento}>
                        <TableCell align="center">{item.id_movimento}</TableCell>

                        <TableCell align="center">{item.dispositivo || '-'}</TableCell>

                        <TableCell align="center">{item.item || '-'}</TableCell>

                        <TableCell align="center">{item.local_origem || '-'}</TableCell>

                        <TableCell align="center">{item.local_destino || '-'}</TableCell>



                        <TableCell align="center">
                          {item.movido_em ? fDateTime(item.movido_em) : '-'}
                        </TableCell>

                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          <TableActions
                            row={item}
                            edit={{
                              onClick: () => handleEdit(item),
                              icon: <MdOutlineNoteAlt />,
                              tooltip: 'Observação'
                            }}
                            viewer={{
                              onClick: () => handleView(item),
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  <TableNoData />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePagination />
        </Card>
      </RHFFormProvider>
    </Container>
  );
}

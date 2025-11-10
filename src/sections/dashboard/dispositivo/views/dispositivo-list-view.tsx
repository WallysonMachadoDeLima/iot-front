'use client';

import { useError } from '@/hooks';
import { IDispositivoFindAll } from '@/models';
import { paths, useRouter } from '@/routes';
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
import { useEffect } from 'react';

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

import { dispositivoService } from '@/services';
import { DISPOSITIVO_ENUM } from '../enums';

export function DispositivoListView() {
  const router = useRouter();
  const handleError = useError();
  const settings = useSettingsContext();

  const { methods, localFilteringPaging } = useTableLocal<IDispositivoFindAll>();

  const { setValue, watch } = methods;

  const { dense, dataTableFilter, linesPerPage, page, search, tab } = watch();

  const fetchData = () => localFilteringPaging('ativo');

  const handleEdit = (item: IDispositivoFindAll) => {
    router.push(paths.dashboard.dispositivo.edit(item.id_dispositivo));
  };

  const handleView = (item: IDispositivoFindAll) => {
    router.push(paths.dashboard.dispositivo.viewer(item.id_dispositivo));
  };

  useEffect(() => {
    fetchData();
  }, [linesPerPage, page, search, tab]);

  useEffect(() => {
    dispositivoService
      .findAll()
      .then((response: any[]) => setValue('dataTable', response))
      .catch((error: any) => handleError(error, 'Serviço de Dispositivo indisponível'));
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RHFFormProvider methods={methods}>
        <CustomBreadcrumbs
          heading="Listagem de Dispositivo"
          links={[
            { name: 'Painel', href: paths.dashboard.root },
            {
              name: 'Dispositivos',
              href: paths.dashboard.dispositivo.list,
            },
            { name: 'Lista' },
          ]}
          actionRouter={{
            type: 'create',
            route: paths.dashboard.dispositivo.create,
            label: 'Novo Dispositivo',
          }}
        />
        <Card>
          <TableFilter />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 650 }} size={dense ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    {DISPOSITIVO_ENUM.tableHeader.map((item) => (
                      <TableCell key={item.label} {...(item as TableCellProps)}>
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTableFilter?.map((item) => {
                    return (
                      <TableRow hover key={item.id_dispositivo}>
                        <TableCell align="center">{item.id_dispositivo}</TableCell>
                        <TableCell align="center">{item.identificador}</TableCell>
                        <TableCell align="center">{item.descricao}</TableCell>
                        <TableCell align="center">{item.tipo}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>
                          <TableActions
                            row={item}
                            edit={{
                              onClick: () => handleEdit(item),
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

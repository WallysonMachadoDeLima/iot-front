'use client';

import { useError } from '@/hooks';
import { IMovimentoFindAll } from '@/models';
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

import { movimentoService } from '@/services';
import { MOVIMENTO_ENUM } from '../enums';



export function MovimentoListView() {
  const router = useRouter();
  const handleError = useError();
  const settings = useSettingsContext();

  const { methods, localFilteringPaging } = useTableLocal<IMovimentoFindAll>();

  const { setValue, watch } = methods;

  const { dense, dataTableFilter, linesPerPage, page, search, tab } = watch();

  const fetchData = () => localFilteringPaging('ativo');

  const handleEdit = (item: IMovimentoFindAll) => {
    router.push(paths.dashboard.movimento.edit(item.id_movimento));
  };

  const handleView = (item: IMovimentoFindAll) => {
    router.push(paths.dashboard.movimento.viewer(item.id_movimento));
  };

  useEffect(() => {
    fetchData();
  }, [linesPerPage, page, search, tab]);

  useEffect(() => {
    movimentoService
      .findAll()
      .then((response: any[]) => setValue('dataTable', response))
      .catch((error: any) => handleError(error, 'Serviço de Movimentação indisponível'));
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
          actionRouter={{
            type: 'create',
            route: paths.dashboard.movimento.create,
            label: 'Nova Movimentação',
          }}
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
                  {dataTableFilter?.map((item) => {
                    return (
                      <TableRow hover key={item.id_movimento}>
                        <TableCell align="center">{item.id_movimento}</TableCell>

                        <TableCell align="center">{item.observacoes}</TableCell>

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

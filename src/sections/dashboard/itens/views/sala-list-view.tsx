'use client';

import { useEffect } from 'react';
import { useError } from '@/hooks';
import { ISalaFindAll } from '@/models';
import { paths, useRouter } from '@/routes';
import { salaService } from '@/services';
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

import { SALA_ENUM } from '../enums';

// ----------------------------------------------------------------------

export function SalaListView() {
  const router = useRouter();
  const handleError = useError();
  const settings = useSettingsContext();

  const { methods, localFilteringPaging } = useTableLocal<ISalaFindAll>();

  const { setValue, watch } = methods;

  const { dense, dataTableFilter, linesPerPage, page, search, tab } = watch();

  const fetchData = () => localFilteringPaging('ativo');

  const handleEdit = (item: ISalaFindAll) => {
    router.push(paths.dashboard.infraestrutura.sala.edit(item.id));
  };

  const handleView = (item: ISalaFindAll) => {
    router.push(paths.dashboard.infraestrutura.sala.view(item.id));
  };

  useEffect(() => {
    fetchData();
  }, [linesPerPage, page, search, tab]);

  useEffect(() => {
    salaService
      .findAll()
      .then((response: ISalaFindAll[]) => setValue('dataTable', response))
      .catch((error: any) => handleError(error, 'Serviço de Salas indisponível'));
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RHFFormProvider methods={methods}>
        <CustomBreadcrumbs
          heading="Listagem de Salas"
          links={[
            { name: 'Painel', href: paths.dashboard.root },
            {
              name: 'Salas',
              href: paths.dashboard.infraestrutura.sala.list,
            },
            { name: 'Lista' },
          ]}
          actionRouter={{
            type: 'create',
            route: paths.dashboard.infraestrutura.sala.create,
            label: 'Nova Sala',
          }}
        />
        <Card>
          <TableFilter />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 650 }} size={dense ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    {SALA_ENUM.tableHeader.map((item) => (
                      <TableCell key={item.label} {...(item as TableCellProps)}>
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTableFilter?.map((item) => {
                    return (
                      <TableRow hover key={item.id}>
                        <TableCell align="center">{item.id}</TableCell>

                        <TableCell>{item.descricao}</TableCell>

                        <TableCell align="center">{item.nome}</TableCell>

                        <TableCell align="center">{item.descricao}</TableCell>

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

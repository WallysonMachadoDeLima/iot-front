'use client';

import { useError } from '@/hooks';
import { ITipoLocalFindAll } from '@/models';
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

import { tipoLocalService } from '@/services';
import { TIPO_LOCAL_ENUM } from '../enums';



export function TipoLocalListView() {
  const router = useRouter();
  const handleError = useError();
  const settings = useSettingsContext();

  const { methods, localFilteringPaging } = useTableLocal<ITipoLocalFindAll>();

  const { setValue, watch } = methods;

  const { dense, dataTableFilter, linesPerPage, page, search, tab } = watch();

  const fetchData = () => localFilteringPaging('ativo');

  const handleEdit = (item: ITipoLocalFindAll) => {
    router.push(paths.dashboard.tipoLocal.edit(item.id_tipolocal));
  };

  const handleView = (item: ITipoLocalFindAll) => {
    router.push(paths.dashboard.tipoLocal.viewer(item.id_tipolocal));
  };

  useEffect(() => {
    fetchData();
  }, [linesPerPage, page, search, tab]);

  useEffect(() => {
    tipoLocalService
      .findAll()
      .then((response: any[]) => setValue('dataTable', response))
      .catch((error: any) => handleError(error, 'Serviço de Tipos de Local indisponível'));
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RHFFormProvider methods={methods}>
        <CustomBreadcrumbs
          heading="Listagem de Tipos de Local"
          links={[
            { name: 'Painel', href: paths.dashboard.root },
            {
              name: 'Tipos de Local',
              href: paths.dashboard.tipoLocal.list,
            },
            { name: 'Lista' },
          ]}
          actionRouter={{
            type: 'create',
            route: paths.dashboard.tipoLocal.create,
            label: 'Novo Tipo de Local',
          }}
        />
        <Card>
          <TableFilter />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 650 }} size={dense ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    {TIPO_LOCAL_ENUM.tableHeader.map((item) => (
                      <TableCell key={item.label} {...(item as TableCellProps)}>
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTableFilter?.map((item) => {
                    return (
                      <TableRow hover key={item.id_tipolocal}>
                        <TableCell align="center">{item.id_tipolocal}</TableCell>

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

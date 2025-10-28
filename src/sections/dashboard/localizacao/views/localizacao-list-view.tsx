'use client';

import { useError } from '@/hooks';
import { ILocalizacaoFindAll } from '@/models';
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

import { localizacaoService } from '@/services';
import { TIPO_LOCAL_ENUM } from '../enums';



export function LocalizacaoListView() {
  const router = useRouter();
  const handleError = useError();
  const settings = useSettingsContext();

  const { methods, localFilteringPaging } = useTableLocal<ILocalizacaoFindAll>();

  const { setValue, watch } = methods;

  const { dense, dataTableFilter, linesPerPage, page, search, tab } = watch();

  const fetchData = () => localFilteringPaging('ativo');

  const handleEdit = (item: ILocalizacaoFindAll) => {
    router.push(paths.dashboard.localizacao.edit(item.id_local));
  };

  const handleView = (item: ILocalizacaoFindAll) => {
    router.push(paths.dashboard.localizacao.viewer(item.id_local));
  };

  useEffect(() => {
    fetchData();
  }, [linesPerPage, page, search, tab]);

  useEffect(() => {
    localizacaoService
      .findAll()
      .then((response: any[]) => setValue('dataTable', response))
      .catch((error: any) => handleError(error, 'Serviço de Localização indisponível'));
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <RHFFormProvider methods={methods}>
        <CustomBreadcrumbs
          heading="Listagem de Localização"
          links={[
            { name: 'Painel', href: paths.dashboard.root },
            {
              name: 'Localização',
              href: paths.dashboard.localizacao.list,
            },
            { name: 'Lista' },
          ]}
          actionRouter={{
            type: 'create',
            route: paths.dashboard.localizacao.create,
            label: 'Novo Localização',
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
                      <TableRow hover key={item.id_local}>
                        <TableCell align="center">{item.id_local}</TableCell>

                        <TableCell align="center">{item.nome}</TableCell>

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

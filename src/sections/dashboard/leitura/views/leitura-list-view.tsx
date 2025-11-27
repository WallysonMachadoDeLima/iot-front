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
import { ILeituraFindAll } from '@/models';
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

import { leituraService } from '@/services';
import { LEITURA_ENUM } from '../enums';

const REFRESH_INTERVAL = 1500;

export function LeituraListView() {
    const router = useRouter();
    const handleError = useError();
    const settings = useSettingsContext();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { methods, localFilteringPaging } = useTableLocal<ILeituraFindAll>();

    const { setValue, watch } = methods;

    const { dense, dataTableFilter, linesPerPage, page, search, tab } = watch();

    const fetchData = () => localFilteringPaging('ativo');

    const loadLeituras = useCallback(() => {
        leituraService
            .findAll()
            .then((response: any[]) => setValue('dataTable', response))
            .catch((error: any) => handleError(error, 'Serviço de Leitura indisponível'));
    }, [setValue, handleError]);

    const handleView = (item: ILeituraFindAll) => {
        router.push(paths.dashboard.leitura.viewer(item.id_leitura));
    };

    useEffect(() => {
        fetchData();
    }, [linesPerPage, page, search, tab]);

    // Auto-refresh: carrega dados inicialmente e configura intervalo
    useEffect(() => {
        // Carrega dados imediatamente
        loadLeituras();

        // Configura auto-refresh
        intervalRef.current = setInterval(() => {
            loadLeituras();
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
                    heading="Listagem de Leituras"
                    links={[
                        { name: 'Painel', href: paths.dashboard.root },
                        {
                            name: 'Leitura',
                            href: paths.dashboard.leitura.list,
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
                                        {LEITURA_ENUM.tableHeader.map((item) => (
                                            <TableCell key={item.label} {...(item as TableCellProps)}>
                                                {item.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataTableFilter
                                        .sort((a, b) => b.id_leitura - a.id_leitura)
                                        ?.map((item) => {
                                            return (
                                                <TableRow hover key={item.id_leitura}>
                                                    <TableCell align="center">{item.id_leitura}</TableCell>

                                                    <TableCell align="center">{item.tag_codigo || '-'}</TableCell>

                                                    <TableCell align="center">{item.item || '-'}</TableCell>

                                                    <TableCell align="center">{item.dispositivo || '-'}</TableCell>

                                                    <TableCell align="center">
                                                        {item.rssi ? `${item.rssi} dBm` : '-'}
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        {item.lido_em ? fDateTime(item.lido_em) : '-'}
                                                    </TableCell>

                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        <TableActions
                                                            row={item}
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

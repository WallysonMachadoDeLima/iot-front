'use client';

import { useError } from '@/hooks';
import { ILeituraFindAll } from '@/models';
import { paths } from '@/routes';
import { leituraService } from '@/services';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { useSettingsContext } from '@/components/settings';
import { useRouter } from '@/routes/hooks';
import { fDateTime } from '@/utils/format-time';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

interface ViewFieldProps {
    label: string;
    value: string | number | undefined;
}

function ViewField({ label, value }: ViewFieldProps) {
    return (
        <Paper sx={{ p: 2, w: '100%' }}>
            <Typography variant="caption" color="text.secondary" gutterBottom>
                {label}
            </Typography>
            <Typography variant="body1">{value || '-'}</Typography>
        </Paper>
    );
}

export function LeituraViewerView() {
    const settings = useSettingsContext();
    const router = useRouter();
    const handleErrors = useError();

    const { id } = useParams();

    const [currentData, setCurrentData] = useState<ILeituraFindAll>();

    useEffect(() => {
        leituraService
            .findOneById(Number(id))
            .then((response) => setCurrentData(response))
            .catch((error) => {
                handleErrors(error, 'Erro ao consultar a Leitura');
                router.push(paths.dashboard.leitura.list);
            });
    }, []);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Visualizar Leitura"
                links={[
                    {
                        name: 'Painel',
                        href: paths.dashboard.root,
                    },
                    {
                        name: 'Leitura',
                        href: paths.dashboard.leitura.list,
                    },
                    { name: currentData?.tag_codigo },
                ]}
            />

            {currentData && (
                <Box sx={{ mt: 3 }}>
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 3,
                            }}
                        >
                            <ViewField label="ID" value={currentData.id_leitura} />
                            <ViewField label="Tag RFID" value={currentData.tag_codigo} />
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 3,
                            }}
                        >
                            <ViewField label="Item" value={currentData.item} />
                            <ViewField label="Dispositivo" value={currentData.dispositivo} />
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={3}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 3,
                            }}
                        >
                            <ViewField
                                label="RSSI"
                                value={currentData.rssi ? `${currentData.rssi} dBm` : undefined}
                            />
                            <ViewField
                                label="Data/Hora da Leitura"
                                value={currentData.lido_em ? fDateTime(currentData.lido_em) : undefined}
                            />
                        </Stack>

                        {currentData.payload_json && (
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="caption" color="text.secondary" gutterBottom>
                                    Payload JSON
                                </Typography>
                                <Box
                                    component="pre"
                                    sx={{
                                        mt: 1,
                                        p: 2,
                                        backgroundColor: 'grey.100',
                                        borderRadius: 1,
                                        overflow: 'auto',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {JSON.stringify(currentData.payload_json, null, 2)}
                                </Box>
                            </Paper>
                        )}
                    </Stack>
                </Box>
            )}
        </Container>
    );
}

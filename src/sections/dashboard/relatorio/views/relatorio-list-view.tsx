'use client';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import { useSettingsContext } from '@/components/settings';
import { paths } from '@/routes';
import {
    Box,
    Button,
    Card,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRelatorio } from '../hooks';

const TIPOS_RELATORIO = [
    {
        id: 'resumo-sala-atual',
        titulo: 'Resumo por Local',
        descricao: 'Exibe um resumo com a quantidade de itens atualmente em cada sala.',
        icon: 'mdi:chart-pie',
        color: '#2196f3',
    },
    {
        id: 'itens-por-sala',
        titulo: 'Itens por Sala',
        descricao: 'Lista detalhada de todos os itens presentes em cada sala.',
        icon: 'mdi:format-list-bulleted',
        color: '#4caf50',
    },
    {
        id: 'movimentacao-itens',
        titulo: 'Movimentação por Itens',
        descricao: 'Histórico completo de movimentação dos itens entre locais.',
        icon: 'mdi:swap-horizontal',
        color: '#ff9800',
    },
];

export function RelatorioListView() {
    const settings = useSettingsContext();
    const router = useRouter();
    const { loading, gerarResumoSalaAtual, gerarItensporSala } = useRelatorio();

    const handleGerarRelatorio = async (tipo: string) => {
        switch (tipo) {
            case 'resumo-sala-atual':
                await gerarResumoSalaAtual();
                break;
            case 'itens-por-sala':
                await gerarItensporSala();
                break;
            case 'movimentacao-itens':
                router.push(paths.dashboard.relatorio.create);
                break;
        }
    };

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Relatórios"
                links={[
                    { name: 'Painel', href: paths.dashboard.root },
                    { name: 'Relatórios' },
                ]}
                action={
                    <Button
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={() => router.push(paths.dashboard.relatorio.create)}
                    >
                        Gerar Relatório
                    </Button>
                }
            />

            <Grid container spacing={3}>
                {TIPOS_RELATORIO.map((relatorio) => (
                    <Grid item xs={12} md={4} key={relatorio.id}>
                        <Card sx={{ p: 3, height: '100%' }}>
                            <Stack spacing={2} sx={{ height: '100%' }}>
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 2,
                                        backgroundColor: `${relatorio.color}20`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Iconify
                                        icon={relatorio.icon}
                                        width={32}
                                        sx={{ color: relatorio.color }}
                                    />
                                </Box>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {relatorio.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {relatorio.descricao}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    disabled={loading}
                                    onClick={() => handleGerarRelatorio(relatorio.id)}
                                    startIcon={
                                        relatorio.id === 'movimentacao-itens' ? (
                                            <Iconify icon="eva:settings-2-fill" />
                                        ) : (
                                            <Iconify icon="mdi:file-pdf-box" />
                                        )
                                    }
                                >
                                    {relatorio.id === 'movimentacao-itens' ? 'Configurar' : 'Gerar PDF'}
                                </Button>
                            </Stack>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
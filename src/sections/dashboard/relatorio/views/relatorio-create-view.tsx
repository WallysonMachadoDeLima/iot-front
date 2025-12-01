'use client';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { RHFFormProvider, RHFSelect } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import { useSettingsContext } from '@/components/settings';
import { useSnackbar } from '@/components/snackbar';
import { paths } from '@/routes';

import {
    Box,
    Button,
    Card,
    CircularProgress,
    Container,
    MenuItem,
    Stack,
    Typography,
} from '@mui/material';

import { useForm } from 'react-hook-form';
import { FiltrosMovimentacao } from '../components';
import { useRelatorio } from '../hooks';

interface FormValues {
    tipoRelatorio: string;
    dataInicio?: Date;
    dataFim?: Date;
    tagCodigo?: string;
}

const TIPOS_RELATORIO = [
    { value: 'resumo-sala-atual', label: 'Resumo por Local (Situação Atual)' },
    { value: 'itens-por-sala', label: 'Itens por Sala' },
    { value: 'movimentacao-itens', label: 'Movimentação por Itens' },
];

export function RelatorioCreateView() {
    const settings = useSettingsContext();
    const { loading, gerarResumoSalaAtual, gerarItensporSala, gerarMovimentacaoItens } = useRelatorio();

    const methods = useForm<FormValues>({
        defaultValues: {
            tipoRelatorio: '',
            dataInicio: undefined,
            dataFim: undefined,
            tagCodigo: '',
        },
    });

    const { handleSubmit, watch } = methods;
    const tipoRelatorio = watch('tipoRelatorio');

    const onSubmit = async (data: FormValues) => {
        switch (data.tipoRelatorio) {
            case 'resumo-sala-atual':
                await gerarResumoSalaAtual();
                break;
            case 'itens-por-sala':
                await gerarItensporSala();
                break;
            case 'movimentacao-itens':
                await gerarMovimentacaoItens({
                    dataInicio: data.dataInicio,
                    dataFim: data.dataFim,
                    tagCodigo: data.tagCodigo,
                });
                break;
        }
    };



    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Gerar Relatório"
                links={[
                    { name: 'Painel', href: paths.dashboard.root },
                    { name: 'Relatórios', href: paths.dashboard.relatorio.create },
                    { name: 'Gerar' },
                ]}
            />

            <Card sx={{ p: 3 }}>
                <RHFFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Selecione o Tipo de Relatório
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Escolha o tipo de relatório que deseja gerar
                            </Typography>

                            <RHFSelect
                                name="tipoRelatorio"
                                label="Tipo de Relatório"
                                placeholder="Selecione..."
                            >
                                <MenuItem value="">
                                    <em>Selecione um tipo de relatório</em>
                                </MenuItem>
                                {TIPOS_RELATORIO.map((tipo) => (
                                    <MenuItem key={tipo.value} value={tipo.value}>
                                        {tipo.label}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Box>

                        {tipoRelatorio && (
                            <Box
                                sx={{
                                    p: 2,
                                    borderRadius: 1,
                                    backgroundColor: 'background.neutral',
                                }}
                            >
                                <Typography variant="subtitle2" gutterBottom>
                                    Descrição do Relatório
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {tipoRelatorio === 'resumo-sala-atual' &&
                                        'Exibe um resumo com a quantidade de itens atualmente em cada sala.'}
                                    {tipoRelatorio === 'itens-por-sala' &&
                                        'Lista detalhada de todos os itens presentes em cada sala.'}
                                    {tipoRelatorio === 'movimentacao-itens' &&
                                        'Histórico completo de movimentação dos itens entre locais.'}
                                </Typography>
                            </Box>
                        )}

                        {/* Filtros para Movimentação */}
                        <FiltrosMovimentacao showFiltros={tipoRelatorio === 'movimentacao-itens'} />

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={!tipoRelatorio || loading}
                                startIcon={
                                    loading ? (
                                        <CircularProgress size={20} />
                                    ) : (
                                        <Iconify icon="mdi:file-pdf-box" />
                                    )
                                }
                            >
                                {loading ? 'Gerando...' : 'Gerar Relatório PDF'}
                            </Button>
                        </Stack>
                    </Stack>
                </RHFFormProvider>
            </Card>
        </Container>
    );
}

'use client';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { RHFFormProvider, RHFSelect } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import { useSettingsContext } from '@/components/settings';
import { useSnackbar } from '@/components/snackbar';
import { paths } from '@/routes';
import { relatorioService } from '@/services';
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
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ResumoSalaPDF } from '../components/resumo-sala-pdf';

interface FormValues {
    tipoRelatorio: string;
}

const TIPOS_RELATORIO = [
    { value: 'resumo-sala-atual', label: 'Resumo por Local (Situação Atual)' },
    { value: 'itens-por-sala', label: 'Itens por Sala' },
    { value: 'movimentacao-itens', label: 'Movimentação por Itens' },
];

export function RelatorioCreateView() {
    const settings = useSettingsContext();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const methods = useForm<FormValues>({
        defaultValues: {
            tipoRelatorio: '',
        },
    });

    const { handleSubmit, watch } = methods;
    const tipoRelatorio = watch('tipoRelatorio');

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);

            switch (data.tipoRelatorio) {
                case 'resumo-sala-atual':
                    await gerarResumoSalaAtual();
                    break;
                case 'itens-por-sala':
                    enqueueSnackbar('Relatório em desenvolvimento', { variant: 'info' });
                    break;
                case 'movimentacao-itens':
                    enqueueSnackbar('Relatório em desenvolvimento', { variant: 'info' });
                    break;
                default:
                    enqueueSnackbar('Selecione um tipo de relatório', { variant: 'warning' });
            }
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            enqueueSnackbar('Erro ao gerar relatório', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const gerarResumoSalaAtual = async () => {
        try {
            const dados = await relatorioService.getResumoAtualPorSala();

            if (dados.length === 0) {
                enqueueSnackbar('Nenhum dado encontrado para o relatório', { variant: 'warning' });
                return;
            }

            // Gerar PDF
            const blob = await pdf(<ResumoSalaPDF dados={dados} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `relatorio-resumo-salas-${new Date().getTime()}.pdf`;
            link.click();
            URL.revokeObjectURL(url);

            enqueueSnackbar('Relatório gerado com sucesso!', { variant: 'success' });
        } catch (error) {
            throw error;
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

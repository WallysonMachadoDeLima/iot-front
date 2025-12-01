import { useSnackbar } from '@/components/snackbar';
import { relatorioService } from '@/services';
import { pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import { ItensSalaPDF, MovimentacaoItensPDF, ResumoSalaPDF } from '../components';

interface UseRelatorioParams {
    dataInicio?: Date;
    dataFim?: Date;
    tagCodigo?: string;
}

export function useRelatorio() {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const downloadPDF = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const gerarResumoSalaAtual = async () => {
        try {
            setLoading(true);
            const dados = await relatorioService.getResumoAtualPorSala();

            if (dados.length === 0) {
                enqueueSnackbar('Nenhum dado encontrado para o relatório', { variant: 'warning' });
                return;
            }

            const blob = await pdf(ResumoSalaPDF({ dados })).toBlob();
            downloadPDF(blob, `relatorio-resumo-salas-${new Date().getTime()}.pdf`);
            enqueueSnackbar('Relatório gerado com sucesso!', { variant: 'success' });
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            enqueueSnackbar('Erro ao gerar relatório', { variant: 'error' });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const gerarItensporSala = async () => {
        try {
            setLoading(true);
            const dados = await relatorioService.getItensAtuaisPorSala();

            if (dados.length === 0) {
                enqueueSnackbar('Nenhum item encontrado para o relatório', { variant: 'warning' });
                return;
            }

            const blob = await pdf(ItensSalaPDF({ dados })).toBlob();
            downloadPDF(blob, `relatorio-itens-por-sala-${new Date().getTime()}.pdf`);
            enqueueSnackbar('Relatório de itens gerado com sucesso!', { variant: 'success' });
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            enqueueSnackbar('Erro ao gerar relatório', { variant: 'error' });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const gerarMovimentacaoItens = async (params: UseRelatorioParams) => {
        try {
            setLoading(true);
            const filtros = {
                dataInicio: params.dataInicio ? params.dataInicio.toISOString().split('T')[0] : undefined,
                dataFim: params.dataFim ? params.dataFim.toISOString().split('T')[0] : undefined,
                tagCodigo: params.tagCodigo || undefined,
            };

            const dados = await relatorioService.getMovimentacaoPorItens(filtros);

            if (dados.length === 0) {
                enqueueSnackbar('Nenhuma movimentação encontrada para os filtros selecionados', { 
                    variant: 'warning' 
                });
                return;
            }

            const blob = await pdf(
                MovimentacaoItensPDF({ dados, filtros })
            ).toBlob();
            downloadPDF(blob, `relatorio-movimentacao-itens-${new Date().getTime()}.pdf`);
            enqueueSnackbar('Relatório de movimentação gerado com sucesso!', { variant: 'success' });
        } catch (error) {
            console.error('Erro ao gerar relatório:', error);
            enqueueSnackbar('Erro ao gerar relatório', { variant: 'error' });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        gerarResumoSalaAtual,
        gerarItensporSala,
        gerarMovimentacaoItens,
    };
}
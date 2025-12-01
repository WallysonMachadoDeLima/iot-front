import { IMovimentacaoPorItem } from '@/models';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
        borderBottom: '2 solid #2196f3',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#666666',
    },
    infoBox: {
        marginTop: 15,
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
    },
    infoText: {
        fontSize: 10,
        color: '#555555',
        marginBottom: 3,
    },
    itemSection: {
        marginTop: 15,
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1976d2',
        backgroundColor: '#e3f2fd',
        padding: 6,
        borderRadius: 4,
        marginBottom: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#2196f3',
        padding: 6,
        borderRadius: 4,
    },
    tableHeaderCell: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1 solid #eeeeee',
        padding: 6,
        minHeight: 25,
    },
    tableRowEven: {
        backgroundColor: '#f9f9f9',
    },
    tableCell: {
        fontSize: 8,
        color: '#333333',
    },
    col1: { width: '20%' },
    col2: { width: '20%' },
    col3: { width: '15%' },
    col4: { width: '15%' },
    col5: { width: '30%' },
    emptyMessage: {
        fontSize: 10,
        color: '#999999',
        fontStyle: 'italic',
        padding: 10,
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 9,
        color: '#999999',
        borderTop: '1 solid #eeeeee',
        paddingTop: 10,
    },
});

interface MovimentacaoItensPDFProps {
    dados: IMovimentacaoPorItem[];
    filtros?: {
        dataInicio?: string;
        dataFim?: string;
        tagCodigo?: string;
    };
}

export function MovimentacaoItensPDF({ dados, filtros }: MovimentacaoItensPDFProps) {
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Agrupar movimentações por item
    const movimentacoesPorItem = dados.reduce((acc, mov) => {
        if (!acc[mov.item]) {
            acc[mov.item] = [];
        }
        acc[mov.item].push(mov);
        return acc;
    }, {} as Record<string, IMovimentacaoPorItem[]>);

    const totalMovimentacoes = dados.length;
    const totalItens = Object.keys(movimentacoesPorItem).length;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório de Movimentação por Itens</Text>
                    <Text style={styles.subtitle}>Histórico de Movimentações</Text>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Data de Geração: {dataAtual}</Text>
                    <Text style={styles.infoText}>Total de Itens: {totalItens}</Text>
                    <Text style={styles.infoText}>Total de Movimentações: {totalMovimentacoes}</Text>
                    {filtros?.dataInicio && filtros?.dataFim && (
                        <Text style={styles.infoText}>
                            Período: {new Date(filtros.dataInicio).toLocaleDateString('pt-BR')} até{' '}
                            {new Date(filtros.dataFim).toLocaleDateString('pt-BR')}
                        </Text>
                    )}
                    {filtros?.tagCodigo && (
                        <Text style={styles.infoText}>Filtro por Tag: {filtros.tagCodigo}</Text>
                    )}
                </View>

                {/* Movimentações por Item */}
                {Object.entries(movimentacoesPorItem).map(([item, movimentacoes]) => (
                    <View key={item} style={styles.itemSection}>
                        <Text style={styles.itemTitle}>
                            {item} ({movimentacoes.length} {movimentacoes.length === 1 ? 'movimentação' : 'movimentações'})
                        </Text>

                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, styles.col1]}>Origem</Text>
                            <Text style={[styles.tableHeaderCell, styles.col2]}>Destino</Text>
                            <Text style={[styles.tableHeaderCell, styles.col3]}>Tipo Origem</Text>
                            <Text style={[styles.tableHeaderCell, styles.col4]}>Tipo Destino</Text>
                            <Text style={[styles.tableHeaderCell, styles.col5]}>Data/Hora</Text>
                        </View>

                        {/* Table Rows */}
                        {movimentacoes.map((mov, index) => (
                            <View
                                key={`${mov.id_item}-${mov.movido_em}-${index}`}
                                style={index % 2 === 0 ? [styles.tableRow, styles.tableRowEven] : styles.tableRow}
                            >
                                <Text style={[styles.tableCell, styles.col1]}>{mov.origem}</Text>
                                <Text style={[styles.tableCell, styles.col2]}>{mov.destino}</Text>
                                <Text style={[styles.tableCell, styles.col3]}>{mov.tipo_origem}</Text>
                                <Text style={[styles.tableCell, styles.col4]}>{mov.tipo_destino}</Text>
                                <Text style={[styles.tableCell, styles.col5]}>
                                    {new Date(mov.movido_em).toLocaleString('pt-BR')}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}

                {dados.length === 0 && (
                    <Text style={styles.emptyMessage}>
                        Nenhuma movimentação encontrada para o período selecionado.
                    </Text>
                )}

                {/* Footer */}
                <Text style={styles.footer}>
                    Documento gerado automaticamente pelo Sistema de Rastreamento IoT - {dataAtual}
                </Text>
            </Page>
        </Document>
    );
}
import { IItemAtualPorSala } from '@/models';
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
    salaSection: {
        marginTop: 20,
        marginBottom: 15,
    },
    salaTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1976d2',
        backgroundColor: '#e3f2fd',
        padding: 8,
        borderRadius: 4,
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#2196f3',
        padding: 8,
        borderRadius: 4,
    },
    tableHeaderCell: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1 solid #eeeeee',
        padding: 8,
        minHeight: 30,
    },
    tableRowEven: {
        backgroundColor: '#f9f9f9',
    },
    tableCell: {
        fontSize: 9,
        color: '#333333',
    },
    col1: { width: '10%' },
    col2: { width: '35%' },
    col3: { width: '25%' },
    col4: { width: '30%' },
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

interface ItensSalaPDFProps {
    dados: IItemAtualPorSala[];
}

export function ItensSalaPDF({ dados }: ItensSalaPDFProps) {
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    // Agrupar itens por sala
    const itensPorSala = dados.reduce((acc, item) => {
        if (!acc[item.sala]) {
            acc[item.sala] = [];
        }
        acc[item.sala].push(item);
        return acc;
    }, {} as Record<string, IItemAtualPorSala[]>);

    const totalItens = dados.length;
    const totalSalas = Object.keys(itensPorSala).length;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório de Itens por Sala</Text>
                    <Text style={styles.subtitle}>Listagem Detalhada dos Itens</Text>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Data de Geração: {dataAtual}</Text>
                    <Text style={styles.infoText}>Total de Salas: {totalSalas}</Text>
                    <Text style={styles.infoText}>Total de Itens: {totalItens}</Text>
                </View>

                {/* Itens por Sala */}
                {Object.entries(itensPorSala).map(([sala, itens]) => (
                    <View key={sala} style={styles.salaSection}>
                        <Text style={styles.salaTitle}>
                            {sala} ({itens.length} {itens.length === 1 ? 'item' : 'itens'})
                        </Text>

                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderCell, styles.col1]}>ID</Text>
                            <Text style={[styles.tableHeaderCell, styles.col2]}>Item</Text>
                            <Text style={[styles.tableHeaderCell, styles.col3]}>Tag RFID</Text>
                            <Text style={[styles.tableHeaderCell, styles.col4]}>Última Leitura</Text>
                        </View>

                        {/* Table Rows */}
                        {itens.map((item, index) => (
                            <View
                                key={item.id_item}
                                style={index % 2 === 0 ? [styles.tableRow, styles.tableRowEven] : styles.tableRow}
                            >
                                <Text style={[styles.tableCell, styles.col1]}>{item.id_item}</Text>
                                <Text style={[styles.tableCell, styles.col2]}>{item.item}</Text>
                                <Text style={[styles.tableCell, styles.col3]}>{item.tag_codigo}</Text>
                                <Text style={[styles.tableCell, styles.col4]}>
                                    {new Date(item.ultima_leitura).toLocaleString('pt-BR')}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}

                {dados.length === 0 && (
                    <Text style={styles.emptyMessage}>
                        Nenhum item encontrado para exibir no relatório.
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
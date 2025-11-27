import { IResumoSalaAtual } from '@/models';
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
    tableContainer: {
        marginTop: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#2196f3',
        padding: 10,
        borderRadius: 4,
    },
    tableHeaderCell: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1 solid #eeeeee',
        padding: 10,
        minHeight: 35,
    },
    tableRowEven: {
        backgroundColor: '#f9f9f9',
    },
    tableCell: {
        fontSize: 10,
        color: '#333333',
    },
    col1: {
        width: '10%',
    },
    col2: {
        width: '60%',
    },
    col3: {
        width: '30%',
        textAlign: 'right',
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
    summaryBox: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e3f2fd',
        borderRadius: 4,
        borderLeft: '4 solid #2196f3',
    },
    summaryTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1976d2',
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 10,
        color: '#333333',
        marginBottom: 3,
    },
});

interface ResumoSalaPDFProps {
    dados: IResumoSalaAtual[];
}

export function ResumoSalaPDF({ dados }: ResumoSalaPDFProps) {
    const dataAtual = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const totalItens = dados.reduce((acc, sala) => acc + sala.quantidade_itens, 0);
    const totalSalas = dados.length;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Relatório de Resumo por Sala</Text>
                    <Text style={styles.subtitle}>Situação Atual dos Itens</Text>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>Data de Geração: {dataAtual}</Text>
                    <Text style={styles.infoText}>
                        Sistema de Rastreamento IoT - Controle de Itens por RFID
                    </Text>
                </View>

                {/* Summary Box */}
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>Resumo Geral</Text>
                    <Text style={styles.summaryText}>Total de Salas: {totalSalas}</Text>
                    <Text style={styles.summaryText}>Total de Itens: {totalItens}</Text>
                    <Text style={styles.summaryText}>
                        Média de Itens por Sala: {(totalItens / totalSalas).toFixed(1)}
                    </Text>
                </View>

                {/* Table */}
                <View style={styles.tableContainer}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, styles.col1]}>ID</Text>
                        <Text style={[styles.tableHeaderCell, styles.col2]}>Sala</Text>
                        <Text style={[styles.tableHeaderCell, styles.col3]}>Qtd. Itens</Text>
                    </View>

                    {/* Table Rows */}
                    {dados.map((sala, index) => (
                        <View
                            key={sala.id_sala}
                            style={index % 2 === 0 ? [styles.tableRow, styles.tableRowEven] : styles.tableRow}
                        >
                            <Text style={[styles.tableCell, styles.col1]}>{sala.id_sala}</Text>
                            <Text style={[styles.tableCell, styles.col2]}>{sala.sala}</Text>
                            <Text style={[styles.tableCell, styles.col3]}>{sala.quantidade_itens}</Text>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    Documento gerado automaticamente pelo Sistema de Rastreamento IoT -{' '}
                    {dataAtual}
                </Text>
            </Page>
        </Document>
    );
}

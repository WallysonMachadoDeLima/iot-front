export interface IResumoSalaAtual {
    id_sala: number;
    sala: string;
    quantidade_itens: number;
}

export interface IItemAtualPorSala {
    id_sala: number;
    sala: string;
    id_item: number;
    item: string;
    tag_codigo: string;
    ultima_leitura: string;
}

export interface IMovimentacaoPorItem {
    id_item: number;
    item: string;
    tag_codigo: string;
    origem: string;
    destino: string;
    tipo_origem: string;
    tipo_destino: string;
    movido_em: string;
}

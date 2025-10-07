export interface ISalaFindAll {
    id: number;
    nome: string;
    descricao: string;
}

export interface ISalaCreateEdit {
    id: number;
    nome: string;
    descricao: string;
}

export interface ISalaFindOne extends ISalaCreateEdit { }
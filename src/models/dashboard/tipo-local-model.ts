export interface ITipoLocalFindAll {
    id_tipolocal: number;
    descricao: string;
}

export interface ITipoLocalCreateEdit {
    id_tipolocal: number;
    descricao: string;
}

export interface ITipoLocalFindOne extends ITipoLocalCreateEdit { }
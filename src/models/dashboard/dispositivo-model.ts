
export interface IDispositivoFindAll {
    id_dispositivo: number;
    identificador: string;
    descricao: string;
    tipo: string;
    ativo: number;
    fk_id_tipolocal: number;
    fk_id_local?: number;
    criado_em: Date;
    localizacao?: string;
}

export interface IDispositivoCreateEdit {
    id_dispositivo?: number;
    fk_id_tipolocal: number;
    identificador: string;
    descricao?: string;
    tipo: string;
    ativo?: number;
    criado_em: Date;
    fk_id_local?: number;
}

export interface IDispositivoFindOne extends IDispositivoCreateEdit { }
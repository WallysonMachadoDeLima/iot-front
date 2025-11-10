
export interface IDispositivoFindAll   {
    id_dispositivo: number;
    identificador: string;
    descricao: string;
    tipo: string;
    ativo: number;
    fk_id_tipolocal: number;
    criado_em: Date;
}

export interface IDispositivoCreateEdit {
    id_dispositivo?: number;
    fk_id_tipolocal: number;
    identificador: string;
    descricao?: string;
    tipo: string;
    ativo?: number;
    criado_em: Date;
}

export interface IDispositivoFindOne extends IDispositivoCreateEdit { }
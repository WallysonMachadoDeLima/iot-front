export interface IDispositivoCreateEdit {
    identificador: string;
    descricao?: string;
    tipo: string;
    ativo?: number;
    fk_id_local: number;
}

export interface IDispositivoFindAll extends IDispositivoCreateEdit {
    id_dispositivo: number;
    criado_em: Date;
    localizacao: string;
}

export type TDispositivoTableResp = IDispositivoFindAll;

export type TDispositivoTableRow = IDispositivoFindAll & {
    actions?: boolean;
};

export type TDispositivoDialog = {
    open: boolean;
    type: string;
    data?: IDispositivoFindAll;
};
export interface ILocalizacaoFindAll {
	id_local: number;
	fk_id_tipolocal: number;
	nome: string;
	ativo: number;
	// optional joined field from TipoLocal
	tipo?: string;
}

export interface ILocalizacaoCreateEdit {
	id_local?: number;
	fk_id_tipolocal: number;
	nome: string;
	ativo?: number;
}

export interface ILocalizacaoFindOne extends ILocalizacaoCreateEdit { }

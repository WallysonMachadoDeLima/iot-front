export interface ILeituraFindAll {
	id_leitura: number;
	tag_codigo: string;
	lido_em: string;
	rssi?: number;
	payload_json?: any;
	fk_id_dispositivo: number;
	dispositivo?: string;
	item?: string;
}

export interface ILeituraCreateEdit {
	id_leitura?: number;
	tag_codigo: string;
	lido_em?: string;
	rssi?: number;
	payload_json?: any;
	fk_id_dispositivo: number;
}

export interface ILeituraFindOne extends ILeituraCreateEdit { }

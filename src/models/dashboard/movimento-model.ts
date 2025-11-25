
export interface IMovimentoFindAll {
  id_movimento: number;
  movido_em: string;
  observacoes?: string;
  fk_id_item: number;
  fk_id_local_origem: number;
  fk_id_local_destino: number;
  fk_id_dispositivo: number;
  item?: string;
  local_origem?: string;
  local_destino?: string;
  dispositivo?: string;
}

export interface IMovimentoCreateEdit {
  id_movimento?: number;
  movido_em: string;
  observacoes?: string;
  fk_id_item: number;
  fk_id_local_origem: number;
  fk_id_local_destino: number;
  fk_id_dispositivo: number;
}

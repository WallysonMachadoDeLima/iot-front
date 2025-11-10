
export interface IItemFindAll {
  id_item: number;
  tag_codigo: string;
  nome: string;
  descricao?: string;
  ativo: number;
  criado_em: string;
  fk_id_local_origem: number;
  local_origem?: {
    id_local: number;
    nome: string;
  };
}

export interface IItemCreateEdit {
  id_item?: number;
  tag_codigo: string;
  nome: string;
  descricao?: string;
  ativo?: number;
  fk_id_local_origem: number;
}

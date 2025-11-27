/**
 * EXEMPLOS DE USO - Dashboard de Salas IoT
 * 
 * Este arquivo demonstra como os componentes funcionam juntos
 */

// ============================================
// 1. ROOM CARD - Exemplo de Renderização
// ============================================

/*
Entrada de dados:
{
  id_local: 1,
  fk_id_tipolocal: 2,
  nome: "Sala de Reuniões A",
  ativo: 1,
  tipo: "Sala de Reunião"
}

Resultado Visual:
┌─────────────────────────────┐
│                          🟢 │  <- Badge (verde se ativo)
│                             │
│         ┌─────────┐         │
│         │  🚪     │         │  <- Ícone da sala
│         └─────────┘         │
│                             │
│   Sala de Reuniões A        │  <- Nome
│   Sala de Reunião           │  <- Tipo
│                             │
│        ✅ Ativa             │  <- Status
└─────────────────────────────┘
     (hover para elevar)
*/

// ============================================
// 2. MODAL - Estrutura das Abas
// ============================================

/*
MODAL: "Sala de Reuniões A"
├─ ABA 1: Itens Atualmente na Sala (3 itens)
│  ├─ Mesa Executiva
│  ├─ Cadeira Presidente
│  └─ Projetor LED
│
└─ ABA 2: Itens que Pertencem à Sala (5 itens)
   ├─ Mesa Executiva
   ├─ Cadeira Presidente
   ├─ Projetor LED
   ├─ Tela de Projeção
   └─ Sistema de Som

Diferença:
- ABA 1: Mostra onde os itens ESTÃO AGORA (baseado em leituras RFID)
- ABA 2: Mostra onde os itens DEVERIAM ESTAR (local de origem)
*/

// ============================================
// 3. FLUXO DE CLIQUE NO CARD
// ============================================

/*
Usuário clica no card da "Sala de Reuniões A"
     ↓
handleRoomClick(room) é chamado
     ↓
setSelectedRoom(room) - Define sala selecionada
     ↓
setModalOpen(true) - Abre o modal
     ↓
Modal renderiza com:
  - roomName: "Sala de Reuniões A"
  - itemsInRoom: getItemsInRoom(1)
  - itemsOwnedByRoom: getItemsOwnedByRoom(1)
     ↓
Abas são populadas com dados dos itens
     ↓
Usuário pode navegar entre as abas
*/

// ============================================
// 4. LÓGICA DE VERIFICAÇÃO DE DISPOSITIVO
// ============================================

/*
Dados de entrada:
devices = [
  { id_dispositivo: 1, fk_id_local: 1, ativo: 1 },  // Sala 1 - ATIVO
  { id_dispositivo: 2, fk_id_local: 2, ativo: 0 },  // Sala 2 - INATIVO
  { id_dispositivo: 3, fk_id_local: 3, ativo: 1 },  // Sala 3 - ATIVO
]

Função: hasActiveDevice(1)
├─ Filtra: fk_id_local === 1 && ativo === 1
├─ Encontra: [{ id_dispositivo: 1, fk_id_local: 1, ativo: 1 }]
└─ Retorna: true ✅

Função: hasActiveDevice(2)
├─ Filtra: fk_id_local === 2 && ativo === 1
├─ Encontra: [] (ativo = 0)
└─ Retorna: false ❌

Resultado no Card:
- Sala 1: Badge verde pulsante 🟢
- Sala 2: Badge vermelho 🔴
- Sala 3: Badge verde pulsante 🟢
*/

// ============================================
// 5. FILTRO DE ITENS POR SALA
// ============================================

/*
Dados de entrada:
items = [
  { id_item: 1, nome: "Mesa", fk_id_local_origem: 1 },      // Pertence à Sala 1
  { id_item: 2, nome: "Cadeira", fk_id_local_origem: 1 },   // Pertence à Sala 1
  { id_item: 3, nome: "Projetor", fk_id_local_origem: 2 },  // Pertence à Sala 2
  { id_item: 4, nome: "Notebook", fk_id_local_origem: 1 },  // Pertence à Sala 1
]

Função: getItemsOwnedByRoom(1)
├─ Filtra: item.fk_id_local_origem === 1
├─ Resultado: [
│    { id_item: 1, nome: "Mesa", fk_id_local_origem: 1 },
│    { id_item: 2, nome: "Cadeira", fk_id_local_origem: 1 },
│    { id_item: 4, nome: "Notebook", fk_id_local_origem: 1 }
│  ]
└─ Retorna: 3 itens

Exibição na ABA 2 do Modal:
┌──────────┬──────────┬─────────────┐
│ Tag      │ Nome     │ Status      │
├──────────┼──────────┼─────────────┤
│ TAG-001  │ Mesa     │ ✅ Ativo    │
│ TAG-002  │ Cadeira  │ ✅ Ativo    │
│ TAG-004  │ Notebook │ ✅ Ativo    │
└──────────┴──────────┴─────────────┘
*/

// ============================================
// 6. ESTADOS DO COMPONENTE PRINCIPAL
// ============================================

/*
Estado Inicial:
{
  rooms: [],
  items: [],
  devices: [],
  loading: true,
  selectedRoom: null,
  modalOpen: false
}

Após fetchData():
{
  rooms: [5 salas],
  items: [20 itens],
  devices: [3 dispositivos],
  loading: false,
  selectedRoom: null,
  modalOpen: false
}

Após clicar no card:
{
  rooms: [5 salas],
  items: [20 itens],
  devices: [3 dispositivos],
  loading: false,
  selectedRoom: { id_local: 1, nome: "Sala A", ... },
  modalOpen: true  ← Modal é exibido
}

Após fechar modal:
{
  rooms: [5 salas],
  items: [20 itens],
  devices: [3 dispositivos],
  loading: false,
  selectedRoom: null,  ← Limpa seleção
  modalOpen: false     ← Esconde modal
}
*/

// ============================================
// 7. EXEMPLO DE TABELA NO MODAL
// ============================================

/*
Se itemsInRoom.length === 0:
┌─────────────────────────────────┐
│                                 │
│          📦                     │
│                                 │
│  Nenhum item está atualmente   │
│       nesta sala               │
│                                 │
└─────────────────────────────────┘

Se itemsInRoom.length > 0:
┌──────────┬────────────┬──────────────┬──────────────┬─────────┬──────────────┐
│ Tag      │ Nome       │ Descrição    │ Loc. Origem  │ Status  │ Data Criação │
├──────────┼────────────┼──────────────┼──────────────┼─────────┼──────────────┤
│ TAG-001  │ Mesa       │ Mesa redonda │ Sala A       │ ✅ Ativo│ 20/11/2025   │
│ TAG-002  │ Cadeira    │ Cadeira exec │ Sala A       │ ✅ Ativo│ 20/11/2025   │
│ TAG-003  │ Projetor   │ LED 4K       │ Almoxarifado │ ✅ Ativo│ 15/11/2025   │
└──────────┴────────────┴──────────────┴──────────────┴─────────┴──────────────┘
*/

// ============================================
// 8. CORES E BADGES
// ============================================

/*
DISPOSITIVO ATIVO (deviceActive = true):
- Cor: theme.palette.success.main (verde)
- Animação: pulse (pisca suavemente)
- Tooltip: "Dispositivo ativo"

DISPOSITIVO INATIVO (deviceActive = false):
- Cor: theme.palette.error.main (vermelho)
- Animação: nenhuma
- Tooltip: "Dispositivo inativo"

SALA ATIVA (room.ativo = 1):
- Background: alpha(success, 0.08)
- Text: success.main
- Label: "Ativa"

SALA INATIVA (room.ativo = 0):
- Background: alpha(error, 0.08)
- Text: error.main
- Label: "Inativa"

ITEM ATIVO (item.ativo = 1):
- Chip color: "success"
- Label: "Ativo"

ITEM INATIVO (item.ativo = 0):
- Chip color: "error"
- Label: "Inativo"
*/

export { };


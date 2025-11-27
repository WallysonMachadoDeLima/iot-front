# 🏠 Dashboard de Salas IoT - Guia de Implementação

## ✨ Visão Geral

Foi criado um dashboard visual e interativo para gerenciamento de salas com as seguintes características:

### 📋 Estrutura de Arquivos Criados/Modificados

```
src/sections/overview/app/
├── components/
│   ├── index.ts                    ✨ NOVO
│   ├── room-card.tsx              ✨ NOVO - Card visual da sala
│   └── room-items-modal.tsx       ✨ NOVO - Modal com abas de itens
└── view/
    └── overview-app-view.tsx      🔄 MODIFICADO - View principal

src/services/dashboard/
├── index.ts                        🔄 MODIFICADO - Exportação do item-service
└── item-service.ts                🔄 MODIFICADO - Novo método findByLocalizacao

src/models/dashboard/
└── dispositivo-model.ts           🔄 MODIFICADO - Campo fk_id_local adicionado
```

---

## 🎨 Componentes Visuais

### 1. **RoomCard** - Card de Sala

```typescript
<RoomCard
  room={room}
  deviceActive={hasActiveDevice(room.id_local)}
  onClick={() => handleRoomClick(room)}
/>
```

**Features:**

- 🎯 Card interativo com hover effect (elevação e sombra)
- 💚 Badge de status do dispositivo (verde pulsante se ativo, vermelho se inativo)
- 🔵 Ícone circular com fundo colorido
- 📛 Nome da sala em destaque
- 🏷️ Tipo de sala (se disponível)
- ✅ Status de ativação da sala

**Layout Responsivo:**

- Mobile (xs): 1 card por linha
- Tablet (sm): 2 cards por linha
- Desktop (md): 3 cards por linha
- Large Desktop (lg): 4 cards por linha

---

### 2. **RoomItemsModal** - Modal de Detalhes

```typescript
<RoomItemsModal
  open={modalOpen}
  onClose={handleCloseModal}
  roomName={selectedRoom.nome}
  itemsInRoom={getItemsInRoom(selectedRoom.id_local)}
  itemsOwnedByRoom={getItemsOwnedByRoom(selectedRoom.id_local)}
/>
```

**Features:**

- 📑 Duas abas com contadores de itens
- 📍 **Aba 1**: "Itens Atualmente na Sala" (localização atual)
- 🏠 **Aba 2**: "Itens que Pertencem à Sala" (localização de origem)
- 📊 Tabela completa com todas as informações dos itens
- 🎨 Empty state amigável quando não há itens
- ❌ Botão de fechar intuitivo

**Informações Exibidas na Tabela:**

- Tag RFID (como chip colorido)
- Nome do item
- Descrição
- Localização de origem
- Status (Ativo/Inativo)
- Data de criação

---

## 🔄 Fluxo de Dados

```
Dashboard View (overview-app-view.tsx)
    │
    ├─► fetchData() - Carrega dados em paralelo
    │   ├─► localizacaoService.findAll()
    │   ├─► itemService.findAll()
    │   └─► dispositivoService.findAll()
    │
    ├─► hasActiveDevice(roomId) - Verifica dispositivos ativos
    │   └─► Filtra dispositivos por fk_id_local === roomId && ativo === 1
    │
    ├─► getItemsOwnedByRoom(roomId) - Itens que pertencem à sala
    │   └─► Filtra items por fk_id_local_origem === roomId
    │
    └─► getItemsInRoom(roomId) - Itens atualmente na sala
        └─► 🚧 TODO: Implementar com dados de movimento/leitura
```

---

## 🚀 Como Usar

### 1. Acesse o Dashboard

```
http://localhost:8085/dashboard
```

### 2. Visualize as Salas

- Cards são exibidos em grid responsivo
- Badge verde pulsante = Dispositivo ativo
- Badge vermelho = Dispositivo inativo

### 3. Clique em uma Sala

- Modal abre automaticamente
- Navegue entre as abas para ver:
  - **Aba 1**: Itens que estão atualmente na sala
  - **Aba 2**: Itens cuja origem é esta sala

### 4. Explore os Detalhes

- Veja informações completas de cada item
- Status visual com chips coloridos
- Datas formatadas para melhor leitura

---

## 🎯 Funcionalidades Implementadas

✅ **Grid de Cards Visuais**

- Design moderno com Material-UI
- Responsivo para todos os tamanhos de tela
- Animações suaves de hover

✅ **Indicador de Dispositivo**

- Status visual em tempo real
- Tooltip informativo
- Animação pulsante para dispositivos ativos

✅ **Modal de Detalhes**

- Duas abas funcionais
- Tabelas completas e organizadas
- Empty states amigáveis

✅ **Performance**

- Carregamento paralelo de dados
- Loading state durante fetch
- Filtros eficientes no cliente

✅ **UX/UI**

- Feedback visual claro
- Mensagens de erro com snackbar
- Navegação intuitiva

---

## 🔮 Próximas Implementações

### Implementar Rastreamento em Tempo Real

Para que a aba "Itens Atualmente na Sala" funcione com base na localização real (leituras RFID), será necessário:

1. **Criar Endpoint de Leitura Atual**

```typescript
// Backend API
GET /api/leitura/current/:id_local
// Retorna todos os itens detectados atualmente na sala
```

2. **Criar Serviço de Leitura**

```typescript
// leitura-service.ts
async function getCurrentByLocalizacao(idLocal: number): Promise<IItemFindAll[]> {
  const { data } = await api.next.get(`/leitura/current/${idLocal}`);
  return data;
}
```

3. **Atualizar getItemsInRoom()**

```typescript
const getItemsInRoom = (roomId: number): IItemFindAll[] => {
  // Usar dados de leitura em tempo real
  return itemsFromRFIDReading.filter((item) => item.current_location === roomId);
};
```

### Melhorias Adicionais

- 📊 Gráficos de ocupação das salas
- 🔔 Alertas para itens fora do lugar
- 📱 Atualização em tempo real via WebSocket
- 🔍 Busca e filtros avançados
- 📥 Exportação de relatórios

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Material-UI v5** - Componentes UI
- **React Hooks** - Gerenciamento de estado
- **Axios** - HTTP client
- **date-fns** - Formatação de datas

---

## 📚 Referências

- [Material-UI Documentation](https://mui.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**Desenvolvido com ❤️ para o Sistema IoT**

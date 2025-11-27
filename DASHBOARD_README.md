# Dashboard de Salas - Documentação

## 🎯 Funcionalidades Implementadas

### 1. Visualização em Cards

- Grid responsivo de cards para cada sala
- Design moderno com hover effects e animações
- Informações visuais claras sobre cada sala

### 2. Indicador de Dispositivo Ativo

- Badge com animação pulsante para dispositivos ativos
- Indicador visual (verde = ativo, vermelho = inativo)
- Tooltip informativo ao passar o mouse

### 3. Modal de Detalhes da Sala

Ao clicar em uma sala, abre um modal com:

#### Aba 1: Itens Atualmente na Sala

- Lista de itens que estão fisicamente presentes na sala
- Informações detalhadas: Tag, Nome, Descrição, Status, Data de Criação

#### Aba 2: Itens que Pertencem à Sala

- Lista de itens cuja localização de origem é esta sala
- Mesmas informações detalhadas da Aba 1

### 4. Componentes Criados

#### `RoomCard` - Card de Sala

- Localização: `src/sections/overview/app/components/room-card.tsx`
- Props:
  - `room`: Dados da localização
  - `deviceActive`: Status do dispositivo (boolean)
  - `onClick`: Função executada ao clicar no card

#### `RoomItemsModal` - Modal de Itens

- Localização: `src/sections/overview/app/components/room-items-modal.tsx`
- Props:
  - `open`: Controla visibilidade do modal
  - `onClose`: Função para fechar o modal
  - `roomName`: Nome da sala
  - `itemsInRoom`: Lista de itens atualmente na sala
  - `itemsOwnedByRoom`: Lista de itens que pertencem à sala

### 5. Serviços Atualizados

#### Item Service

Adicionado método: `findByLocalizacao(idLocal: number)`

- Permite buscar itens por localização específica
- Facilita futuras implementações de rastreamento

## 🎨 Design Features

- **Cores e Status**: Sistema de cores consistente (success/error)
- **Responsividade**: Grid adaptativo (xs=12, sm=6, md=4, lg=3)
- **Animações**: Pulse animation para dispositivos ativos
- **Icons**: Iconify para ícones consistentes
- **Empty States**: Mensagens amigáveis quando não há dados

## 🚀 Como Funciona

1. **Carregamento de Dados**:

   - Busca salas, itens e dispositivos em paralelo
   - Loading state durante o carregamento

2. **Verificação de Dispositivos**:

   - Verifica se há dispositivo ativo associado à sala
   - Exibe indicador visual no card

3. **Filtro de Itens**:
   - `getItemsOwnedByRoom()`: Filtra por `fk_id_local_origem`
   - `getItemsInRoom()`: Preparado para implementação futura com dados de movimento

## 📝 Próximos Passos

### Para Implementação Completa de "Itens Atualmente na Sala":

1. **Criar endpoint de movimento/leitura**:

   ```typescript
   // Exemplo de endpoint necessário
   GET /api/movimento/localizacao/:id_local/current
   ```

2. **Integrar com dados de leitura RFID**:

   - Usar tabela de leituras para identificar localização atual
   - Considerar última leitura válida de cada item

3. **Atualizar função `getItemsInRoom()`**:
   ```typescript
   const getItemsInRoom = (roomId: number): IItemFindAll[] => {
     // Implementar lógica com dados de movimento/leitura
     return itemsBasedOnLastMovement;
   };
   ```

## 🔧 Arquivos Modificados

- ✅ `src/sections/overview/app/view/overview-app-view.tsx`
- ✅ `src/sections/overview/app/components/room-card.tsx` (novo)
- ✅ `src/sections/overview/app/components/room-items-modal.tsx` (novo)
- ✅ `src/sections/overview/app/components/index.ts` (novo)
- ✅ `src/services/dashboard/item-service.ts`
- ✅ `src/models/dashboard/dispositivo-model.ts`

## 💡 Dicas de Uso

- **Performance**: Os dados são carregados uma vez e filtrados localmente
- **UX**: Tooltips fornecem informações adicionais
- **Acessibilidade**: Componentes seguem padrões MUI acessíveis

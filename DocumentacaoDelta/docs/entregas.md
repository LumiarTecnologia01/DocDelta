# Entregas

**Função:** Gestão de entregas e romaneios de entrega.

**O que é necessário:**
- Pedidos de Compra com status **ENVIADO** (já enviados para fornecedores)
- Usuários do tipo **Entregador** cadastrados no sistema
- Clientes com endereço e CEP cadastrados

## Como Opera

### 1. Consolidação de Entregas (Admin)

- Seleciona um dia específico
- Sistema busca todos os Pedidos de Compra com status "ENVIADO" daquele dia
- Agrupa automaticamente por cliente
- Exibe total de carga (kg) e total de pedidos por cliente
- Exibe lista de produtos e quantidades para cada cliente
- Admin visualiza endereço completo (CEP e endereço) de cada cliente

### 2. Atribuição de Entregadores (Admin)

- Admin seleciona um entregador para cada cliente
- Visualiza prévia dos totais por entregador (quantidade de clientes, carga total)
- Define data programada para as entregas
- Clica em "Confirmar" para liberar os romaneios

### 3. Criação de Romaneios

- Ao confirmar, o sistema cria um **Romaneio** para cada cliente
- Cada romaneio contém:
  - Cliente e endereço completo
  - Entregador atribuído
  - Data programada
  - Lista de pedidos de venda vinculados
  - Lista de produtos com quantidades
  - Status inicial: PENDENTE

### 4. Acompanhamento de Status (Tempo Real)

- **PENDENTE:** Romaneio criado, aguardando início da entrega
- **EM ROTA:** Entregador iniciou a rota de entrega
- **CONCLUÍDO:** Entrega finalizada

### 5. Interface do Entregador

- Entregador visualiza apenas seus próprios romaneios
- Vê lista de clientes com endereços
- Pode atualizar status do romaneio (PENDENTE → EM ROTA → CONCLUÍDO)
- Admin recebe atualizações em tempo real via WebSocket

### 6. Interface do Admin

- Visualiza todos os romaneios liberados
- Filtra por data programada
- Vê status atualizado em tempo real
- Visualiza totais por entregador (quantidade de romaneios, carga total)
- Pode excluir romaneios quando necessário

## Funcionalidades

- Consolidar entregas por dia a partir de pedidos ENVIADO
- Atribuir entregadores aos clientes
- Criar e liberar romaneios para entregadores
- Acompanhar status das entregas em tempo real
- Visualizar totais por entregador
- Excluir romaneios (apenas admin)
- Filtrar romaneios por data programada

## Fluxo Completo

1. Admin consolida entregas do dia (pedidos ENVIADO)
2. Admin atribui entregadores aos clientes
3. Admin confirma e libera romaneios
4. Entregador visualiza seus romaneios
5. Entregador atualiza status conforme realiza entregas
6. Admin acompanha status em tempo real

**Uso:** Controle logístico completo de entregas, desde a consolidação até a conclusão.
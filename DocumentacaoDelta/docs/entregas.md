# Entregas

**Função:** Gestão de entregas e romaneios de entrega.

**O que é necessário:**
- Pedidos de Compra com status **ENVIADO** (já enviados para fornecedores)
- Usuários do tipo **Entregador** cadastrados no sistema
- Clientes com endereço e CEP cadastrados

## Como Opera

### 1. Consolidação de Entregas (Admin/Logística)

- Seleciona um dia específico
- Sistema busca todos os Pedidos de Compra com status "ENVIADO" daquele dia
- Agrupa automaticamente por cliente
- Exibe total de carga (kg) e total de pedidos por cliente
- Exibe lista de produtos e quantidades para cada cliente
- Admin/Logística visualiza endereço completo (CEP e endereço) de cada cliente

### 2. Atribuição de Entregadores (Admin/Logística)

- Admin/Logística seleciona um entregador para cada cliente
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

### 4. Conferência e Separação (antes da liberação da carga)

- Usuários com perfil **Separação** (ou Admin/Logística) acessam a tela de **Separação**
- Visualizam romaneios com status **PENDENTE** (ainda não liberados para o entregador)
- Para cada romaneio, abrem o modal **"Separar carga"** e conferem:
  - **Solicitado:** quantidades do pedido de venda (em unidade e kg)
  - **Separado:** quantidade realmente separada (baixa real)
  - **Divergência:** quando o separado é menor que o solicitado, o sistema exibe "Falta X un." ou "Falta X kg"
- Ao **Finalizar separação**, o sistema:
  - Registra a **baixa em estoque** (saída por romaneio) com as quantidades informadas
  - Atualiza o status do romaneio para **SEPARADO**
  - Libera o romaneio para o entregador (que passa a visualizá-lo e pode colocar EM ROTA)
- A conferência evita liberar carga sem que o estoque tenha sido baixado e permite registrar divergências (faltas) quando a separação física for menor que o pedido

### 5. Divergência de carga

- **Divergência** é a diferença entre o **solicitado** (pedido de venda) e o **separado** (quantidade informada na tela de separação)
- Quando o separado é menor que o solicitado, o sistema mostra em vermelho: "Falta X [unidade]" ou "Falta X kg"
- Quando o separado é igual ou maior que o solicitado, não há divergência (exibe "—")
- A baixa em estoque é feita **sempre com o valor separado** (real), não com o solicitado; assim o estoque reflete o que de fato saiu

### 6. Acompanhamento de Status (Tempo Real)

- **PENDENTE:** Romaneio criado, aguardando separação
- **SEPARADO:** Carga conferida e separada; estoque baixado; liberado para o entregador
- **EM ROTA:** Entregador iniciou a rota de entrega
- **CONCLUÍDO:** Entrega finalizada

### 7. Interface do Entregador

- Entregador visualiza apenas seus próprios romaneios
- Vê lista de clientes com endereços
- Pode atualizar status do romaneio (PENDENTE → EM ROTA → CONCLUÍDO)
- Admin e Logística recebem atualizações em tempo real via WebSocket

### 8. Interface do Admin e Logística

- Visualiza todos os romaneios liberados
- Filtra por data programada
- Vê status atualizado em tempo real
- Visualiza totais por entregador (quantidade de romaneios, carga total)
- Pode excluir romaneios quando necessário
- **Logística:** Tem acesso completo ao módulo de entregas, igual ao admin, mas sem acesso a outros módulos do sistema

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
3. Admin confirma e libera romaneios (status PENDENTE)
4. Separação (ou Admin) confere e finaliza a separação da carga; estoque é baixado; romaneio fica SEPARADO
5. Entregador visualiza seus romaneios (a partir de SEPARADO)
6. Entregador atualiza status conforme realiza entregas (EM ROTA → CONCLUÍDO)
7. Admin acompanha status em tempo real

**Uso:** Controle logístico completo de entregas, desde a consolidação até a conclusão.

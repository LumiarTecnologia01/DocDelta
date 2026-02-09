# Módulos do Sistema Delta

Documentação dos módulos disponíveis para o usuário final.

---

## 1. Produtos

**Função:** Cadastro e gestão de produtos do catálogo.

**Funcionalidades:**
- Cadastrar produtos com nome, categoria, unidade de medida, NCM e observações
- Definir o **tipo do produto** (COMMODITY ou INDUSTRIALIZADO)
- Editar e excluir produtos existentes
- Buscar produtos por nome ou categoria
- Importar produtos em lote via CSV
- Validação de duplicatas (nome + categoria)

**Campos do Cadastro:**

**Campos Básicos:**
- **Nome:** Nome do produto (obrigatório)
- **Categoria:** Categoria do produto (obrigatório)
- **Unidade de Medida:** Unidade padrão (ex: KG, UN, CX) (obrigatório)
- **NCM:** Código NCM de 8 dígitos (obrigatório)
- **Observações:** Informações adicionais sobre o produto
- **Tipo de Produto:** Define como o preço é formado
  - **COMMODITY:** preço vem de cotação diária (hortifruti)
  - **INDUSTRIALIZADO:** preço pode ser definido manualmente (ex: sucos)

**Campos de Unidade de Venda:**
- **Quantidade por Unidade (kg):** Quantidade em quilogramas que representa uma unidade de venda padrão (obrigatório)
  - Exemplo: Se o produto é vendido em "Saco de 5kg", informe 5
  - Este valor é usado automaticamente na tabela de preços e vendas
  - Deve ser maior que zero
- **Volume:** Campo numérico (quando aplicável)
- **Embalagem:** Nome da embalagem/unidade de venda (opcional)
  - Exemplo: "Saco", "Caixa", "Pacote", "1" (para unidade simples)
  - A embalagem aparece nas vendas quando o produto é vendido por unidade de venda

**Controles de Venda e Compra:**
- **Permite Compra Fracionada:** Quando marcado, permite comprar quantidades fracionadas do produto (ex: 1,5 unidades)
- **Permite Venda Fracionada:** Quando marcado:
  - Habilita opção de venda por KG no carrinho (além da unidade de venda)
  - Permite números fracionados tanto em KG quanto em unidade de venda (ex: 1,5; 2,3)
  - Quando desmarcado: apenas unidade de venda, apenas números inteiros

**Uso:** Base de dados de produtos utilizada em cotações, tabelas de preços e vendas.

**Diferença entre COMMODITY e INDUSTRIALIZADO (visão do usuário):**
- **COMMODITY:** precisa de cotação diária para formar preço; entra no fluxo padrão de cotação → tabela de preços → vendas.
- **INDUSTRIALIZADO:** não exige cotação; pode ter preço manual na tabela e continua vendendo normalmente.

**Produtos vendidos por fardo/caixa (“industrializados”):**
- Aplica-se o conceito de **normalização / grandeza intensiva**: a grandeza relevante é **quantidade por unidade** (unidade de venda), e não kg.
- As grandezas extensivas (peso total em kg) **não são, de fato, o foco**: não há conversão real para kg como base do negócio.
- O sistema trabalha com **preço de unidade base** (ex.: por caixa, por fardo); ex.: suco = quantidade em **unidades**, preço por **unidade base** (R$/un.), sem conversão para kg como referência principal.

---

## 2. Pessoas

**Função:** Cadastro de clientes, fornecedores e transportadores.

**Funcionalidades:**
- Cadastrar pessoas com dados completos (nome, documento, endereço, CEP, WhatsApp, email)
- Marcar pessoa como cliente, fornecedor e/ou transportador
- Editar e excluir cadastros
- Buscar pessoas por nome ou documento
- Importar pessoas em lote via CSV
- Enviar mensagens via WhatsApp diretamente do sistema
- **Vincular produtos a fornecedores** (apenas para pessoas marcadas como fornecedor)

**Vinculação de Produtos a Fornecedores:**

**O que é:**
- Permite definir quais produtos cada fornecedor está habilitado a fornecer
- Facilita a criação de cotações, mostrando apenas produtos relevantes para cada fornecedor
- Melhora a organização e reduz erros na seleção de produtos

**Como usar:**
1. Acesse o cadastro de uma pessoa marcada como **fornecedor**
2. Na coluna "Produtos", clique no botão **"Vincular"**
3. Uma janela será aberta com todos os produtos cadastrados
4. Use a busca para filtrar produtos por nome
5. Marque/desmarque os produtos que o fornecedor pode fornecer
6. Clique em **"Salvar"** para confirmar

**Benefícios:**
- Ao criar uma cotação e adicionar um fornecedor, os produtos vinculados a ele são **automaticamente pré-selecionados**
- O fornecedor recebe apenas produtos que ele realmente fornece
- Reduz tempo na criação de cotações
- Evita enviar cotações com produtos irrelevantes para o fornecedor

**Uso:** Cadastro centralizado de todas as pessoas que interagem com o sistema.

---

## 3. Cotações

**Função:** Criar cotações de preços e coletar ofertas dos fornecedores.

**Funcionalidades:**
- Criar cotação com título e fornecedores
- **Pré-seleção automática de produtos** baseada nos produtos vinculados aos fornecedores
- Gerar links únicos para cada fornecedor responder
- Enviar links via WhatsApp automaticamente
- Visualizar respostas dos fornecedores
- Encerrar cotação manualmente ou automaticamente após 24 horas
- Visualizar resultados consolidados com comparação de preços
- Excluir cotações (com ou sem tabela vinculada)

**Criação de Cotação:**

**Passo 1: Informar Título**
- Digite um título descritivo para a cotação (ex: "Cotação Janeiro 2025")

**Passo 2: Adicionar Fornecedores**
- Selecione um ou mais fornecedores da lista
- Clique em **"Adicionar"** para incluir o fornecedor na cotação
- **Importante:** Ao adicionar um fornecedor, os produtos vinculados a ele são **automaticamente incluídos** na cotação com quantidade estimada padrão (1)

**Pré-seleção Automática de Produtos:**
- Quando você adiciona um fornecedor à cotação, o sistema busca automaticamente os produtos que estão vinculados a esse fornecedor
- Esses produtos são pré-selecionados e aparecem na lista de itens da cotação
- Você pode ajustar as quantidades estimadas conforme necessário
- Se um produto está vinculado a múltiplos fornecedores adicionados, ele aparece apenas uma vez na lista

**Benefícios:**
- **Economia de tempo:** Não precisa selecionar produtos manualmente
- **Reduz erros:** Apenas produtos relevantes aparecem
- **Organização:** Cada fornecedor recebe apenas produtos que ele fornece

**Fluxo:**
1. Criar cotação com título e fornecedores (produtos são pré-selecionados automaticamente)
2. Ajustar quantidades estimadas se necessário
3. Gerar e enviar links para fornecedores
4. Fornecedores acessam link público e respondem com preços
5. Visualizar resultados e comparar ofertas
6. Encerrar cotação quando concluída

**Uso:** Processo de cotação de preços para seleção de fornecedores.

---

## 4. Tabela de Preços

**Função:** Criar tabelas de preços de venda baseadas em cotações encerradas.

**Funcionalidades:**
- Criar tabela de preços a partir de cotação encerrada (COMMODITY)
- Selecionar fornecedor e preços para cada item
- **Adicionar itens INDUSTRIALIZADOS sem cotação** diretamente na tabela
- **"Kg por unid. venda" preenchido automaticamente** do cadastro do produto (não editável)
- Publicar tabela para uso em vendas
- Visualizar tabelas ativas e arquivadas
- Editar itens da tabela antes de publicar
- **Inativar manualmente** tabelas ativas (quando necessário criar nova tabela antes da expiração)
- Filtrar tabelas por data de criação

**Campo "Kg por unid. venda":**
- Este campo é **preenchido automaticamente** com o valor de "Quantidade por Unidade (kg)" do cadastro do produto
- O campo aparece na tabela de preços mas **não é editável**
- Para alterar este valor, edite o cadastro do produto
- Garante consistência entre o cadastro do produto e a tabela de preços

**Publicação de Tabela:**
- **Não bloqueia:** O sistema permite publicar uma nova tabela mesmo quando já existe uma ativa
- **Arquivamento automático:** Ao publicar uma nova tabela, o sistema arquiva automaticamente a tabela anterior
- A tabela anterior é marcada como "ARQUIVADA" e seus preços são removidos imediatamente
- A nova tabela passa a ser a única ativa no sistema

**Inativação Manual:**
- Permite inativar uma tabela ativa manualmente, sem precisar publicar uma nova
- Útil quando é necessário remover preços do sistema temporariamente
- Ao inativar, a tabela é arquivada e seus preços são removidos imediatamente
- Após inativar, é possível criar e publicar uma nova tabela normalmente

**Uso:** Define os preços de venda dos produtos após análise das cotações.

**Produtos INDUSTRIALIZADOS na Tabela de Preços (sem cotação):**
- Após selecionar o produto, o sistema lista **apenas fornecedores vinculados** a ele.
- Itens industrializados aparecem com badge **"Industrializado"**.
- É possível **remover** itens industrializados enquanto a tabela estiver em **RASCUNHO** e o item **não tiver vendas**.

---

## 5. Vendas

**Função:** Criar pedidos de venda para clientes.

**Funcionalidades:**
- Selecionar cliente
- Adicionar produtos ao carrinho com quantidades
- Visualizar preços da tabela ativa
- Buscar produtos por nome ou categoria
- **Aplicar desconto por valor absoluto** (quando negociação habilitada)
- **Vender por KG ou por unidade de venda** (conforme configuração do produto)
- Finalizar pedido de venda
- Agrupar pedidos por cliente e data

**Venda por KG ou Unidade:**

**Quando o produto permite venda fracionada:**
- O carrinho exibe duas opções: **"Kg"** e **"[Unidade]"** (ex: "Saco", "Caixa")
- Você pode alternar entre vender por quilogramas ou por unidade de venda
- **Ambos os modos permitem números fracionados** (ex: 1,5 kg ou 2,3 unidades)
- Ao vender por unidade, o sistema calcula automaticamente o total em kg

**Quando o produto NÃO permite venda fracionada:**
- Apenas a opção de **unidade de venda** está disponível
- **Apenas números inteiros são permitidos** (ex: 1, 2, 3 unidades)
- Não é possível vender por KG
- Mesmo assim, o sistema converte internamente a quantidade de unidades para kg usando o campo “Quantidade por Unidade (kg)” do produto (usado para estoque, cálculos e sugestão de compra).

**Exemplo:**
- Produto: Arroz (permite venda fracionada = true)
  - Pode vender: 1,5 kg OU 2,3 sacos
- Produto: Abacaxi (permite venda fracionada = false)
  - Pode vender: apenas 1, 2, 3 unidades (não pode 1,5)

**Aplicação de Desconto:**

**Como funciona:**
- Para produtos com **negociação habilitada**, você pode aplicar desconto informando o **valor do desconto em reais** (não o preço final)
- O sistema calcula automaticamente o preço unitário a partir do desconto
- O desconto é aplicado no **total do item**, não por kg
- O fato de o produto permitir ou não venda fracionada **não interfere** na negociação: um item pode vender apenas unidades inteiras e, ainda assim, aceitar desconto em R$ quando a tabela marcar “negociável”.

**Exemplo prático:**
- Produto: R$ 10,00/kg, mínimo: R$ 8,00/kg
- Quantidade: 10 kg
- Desconto máximo permitido: (10 - 8) × 10 = **R$ 20,00**
- Você informa desconto: **R$ 15,00**
- Sistema calcula: Preço unitário = 10 - (15/10) = **R$ 8,50/kg** ✓
- Se você tentar desconto maior que R$ 20,00, o sistema ajusta automaticamente para o máximo

**Validações:**
- O desconto não pode resultar em preço abaixo do mínimo
- Se o desconto resultar em preço abaixo do mínimo, o sistema ajusta automaticamente para o desconto máximo permitido
- O campo mostra: **"Máx.: R$ X,XX • Preço (kg): R$ Y,YY • Mín.: R$ Z,ZZ"**

**Motivo do Desconto:**
- Quando você aplica desconto, é **obrigatório** informar o motivo
- O motivo é um campo de texto livre
- Este motivo fica registrado no histórico da venda para auditoria

**Aprovação Automática:**
- Quando um desconto é aplicado, o sistema registra automaticamente quem **aprovou** o desconto
- A aprovação é feita pelo usuário que criou a tabela de preços (admin que habilitou a negociação)
- Este registro fica salvo no histórico da venda

**Uso:** Interface de vendas para criação rápida de pedidos.

---

## 6. Pedidos de Compra

**Função:** Consolidar vendas em pedidos de compra para fornecedores.

**Funcionalidades:**
- Consolidar vendas do dia em pedidos por fornecedor
- Visualizar pedidos consolidados com itens e valores
- Filtrar por data e status de envio
- Enviar pedido via WhatsApp para fornecedor
- Marcar pedido como enviado
- Exportar pedido em CSV
- Imprimir pedido de compra
- Excluir pedidos e vendas vinculadas

**Fluxo:**
1. Vendedor cria pedidos de venda no módulo Vendas
2. Sistema consolida automaticamente por fornecedor
3. Enviar pedido consolidado via WhatsApp
4. Acompanhar status de envio

**Uso:** Gestão de compras baseada nas vendas realizadas.

---

## 7. Estoque

**Função:** Controlar o saldo real de produtos (entrada, saída e ajustes).

**Como funciona:**
- O **saldo de estoque nunca é alterado diretamente**. Toda mudança gera uma **movimentação** registrada no histórico.
- **Entrada automática:** quando um Pedido de Compra é marcado como **ENVIADO**, os itens entram no estoque.
- **Baixa (saída) automática:** quando a **Separação** é finalizada no módulo de Entregas, o sistema registra a **baixa em estoque** com as quantidades realmente separadas (por romaneio). Essa saída é do tipo "SAIDA" com origem "ROMANEIO" e atualiza o saldo em kg.
- **Ajustes manuais:** usados para corrigir divergências, perdas, quebra ou estoque inicial.
- Todas as movimentações são registradas em **kg**. Quando um item é vendido/comprado por fardo/caixa, o sistema usa a equivalência em kg definida no produto para converter automaticamente.

**Ajustes disponíveis na tela de Estoque (Admin):**
1. **Ajustar por diferença**
   - Informar a quantidade a adicionar/remover.
2. **Definir saldo final**
   - Informar o saldo desejado (o sistema calcula a diferença e cria a movimentação).

**Exemplos práticos:**
- **Estoque inicial:** Produto sem saldo → define “saldo final = 100 kg” → entrada de 100 kg.
- **Contagem física:** Saldo atual 83 kg → informar saldo final 100 kg → entrada de 17 kg.

**Uso:** Garantir histórico auditável e saldo real atualizado.

---

## 8. Entregas

**Função:** Gestão de entregas e romaneios de entrega.

**O que é necessário:**
- Pedidos de Compra com status **ENVIADO** (já enviados para fornecedores)
- Usuários do tipo **Entregador** cadastrados no sistema
- Clientes com endereço e CEP cadastrados

**Como opera:**

**1. Consolidação de Entregas (Admin/Logística):**
- Seleciona um dia específico
- Sistema busca todos os Pedidos de Compra com status "ENVIADO" daquele dia
- Agrupa automaticamente por cliente
- Exibe total de carga (kg) e total de pedidos por cliente
- Exibe lista de produtos e quantidades para cada cliente
- Admin/Logística visualiza endereço completo (CEP e endereço) de cada cliente

**2. Atribuição de Entregadores (Admin/Logística):**
- Admin/Logística seleciona um entregador para cada cliente
- Visualiza prévia dos totais por entregador (quantidade de clientes, carga total)
- Define data programada para as entregas
- Clica em "Confirmar" para liberar os romaneios

**3. Criação de Romaneios:**
- Ao confirmar, o sistema cria um **Romaneio** para cada cliente
- Cada romaneio contém:
  - Cliente e endereço completo
  - Entregador atribuído
  - Data programada
  - Lista de pedidos de venda vinculados
  - Lista de produtos com quantidades
  - Status inicial: PENDENTE

**4. Conferência e Separação (antes da liberação da carga):**
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

**5. Divergência de carga:**
- **Divergência** é a diferença entre o **solicitado** (pedido de venda) e o **separado** (quantidade informada na tela de separação)
- Quando o separado é menor que o solicitado, o sistema mostra em vermelho: "Falta X [unidade]" ou "Falta X kg"
- Quando o separado é igual ou maior que o solicitado, não há divergência (exibe "—")
- A baixa em estoque é feita **sempre com o valor separado** (real), não com o solicitado; assim o estoque reflete o que de fato saiu

**6. Acompanhamento de Status (Tempo Real):**
- **PENDENTE:** Romaneio criado, aguardando separação
- **SEPARADO:** Carga conferida e separada; estoque baixado; liberado para o entregador
- **EM ROTA:** Entregador iniciou a rota de entrega
- **CONCLUÍDO:** Entrega finalizada

**7. Interface do Entregador:**
- Entregador visualiza apenas seus próprios romaneios
- Vê lista de clientes com endereços
- Pode atualizar status do romaneio (PENDENTE → EM ROTA → CONCLUÍDO)
- Admin e Logística recebem atualizações em tempo real via WebSocket

**8. Interface do Admin e Logística:**
- Visualiza todos os romaneios liberados
- Filtra por data programada
- Vê status atualizado em tempo real
- Visualiza totais por entregador (quantidade de romaneios, carga total)
- Pode excluir romaneios quando necessário
- **Logística:** Tem acesso completo ao módulo de entregas, igual ao admin, mas sem acesso a outros módulos do sistema

**Funcionalidades:**
- Consolidar entregas por dia a partir de pedidos ENVIADO
- Atribuir entregadores aos clientes
- Criar e liberar romaneios para entregadores
- Acompanhar status das entregas em tempo real
- Visualizar totais por entregador
- Excluir romaneios (apenas admin)
- Filtrar romaneios por data programada

**Fluxo completo:**
1. Admin consolida entregas do dia (pedidos ENVIADO)
2. Admin atribui entregadores aos clientes
3. Admin confirma e libera romaneios (status PENDENTE)
4. Separação (ou Admin) confere e finaliza a separação da carga; estoque é baixado; romaneio fica SEPARADO
5. Entregador visualiza seus romaneios (a partir de SEPARADO)
6. Entregador atualiza status conforme realiza entregas (EM ROTA → CONCLUÍDO)
7. Admin acompanha status em tempo real

**Uso:** Controle logístico completo de entregas, desde a consolidação até a conclusão.

---

## 9. Usuários

**Função:** Gestão de usuários do sistema.

**Funcionalidades:**
- Criar usuários com email e senha
- Definir perfil (admin, vendedor, entregador, logística ou separação)
- Ativar/desativar usuários
- Editar dados de usuários
- Excluir usuários
- Buscar usuários por email

**Perfis:**
- **Admin:** Acesso completo a todos os módulos
- **Vendedor:** Acesso apenas ao módulo de Vendas
- **Entregador:** Acesso apenas ao módulo de Entregas (visualiza apenas seus próprios romaneios)
- **Logística:** Acesso apenas ao módulo de Entregas (mesmas funcionalidades do admin para gestão de entregas)
- **Separação:** Acesso à tela de Separação no módulo de Entregas (conferir e finalizar separação de carga antes da liberação para o entregador)

**Uso:** Controle de acesso e permissões do sistema.

---

## 10. Tabela de Preços de Venda

**Função:** Visualização e gestão da tabela de preços ativa para vendas.

**Funcionalidades:**
- Visualizar tabela de preços publicada
- Ver preços por produto e categoria
- Filtrar produtos
- Gerenciar publicação de tabelas

**Uso:** Consulta de preços durante o processo de vendas.

---

## Fluxo Completo do Sistema

1. **Cadastro Base:** Produtos e Pessoas
2. **Cotação:** Criar cotação → Fornecedores respondem → Analisar resultados
3. **Tabela de Preços:** Criar tabela a partir da cotação → Publicar
4. **Vendas:** Criar pedidos de venda para clientes
5. **Pedidos de Compra:** Consolidar vendas → Enviar para fornecedores
6. **Estoque:** Entradas/saídas automáticas + ajustes manuais
7. **Entregas:** Gerenciar logística

---

## Observações Importantes

- Cotações expiram automaticamente após 24 horas
- Apenas uma tabela de preços pode estar ativa por vez
- **Publicar nova tabela arquiva automaticamente a anterior** (não bloqueia)
- **Tabelas ativas podem ser inativadas manualmente** quando necessário
- Pedidos de compra são gerados automaticamente a partir das vendas
- Estoque é atualizado por movimentações (entrada por pedido ENVIADO, baixa/saída ao finalizar separação do romaneio, ajustes manuais)
- Links de cotação são únicos e válidos por 24 horas
- Usuários vendedores têm acesso limitado apenas ao módulo de Vendas
- Usuários entregadores têm acesso apenas ao módulo de Entregas (suas próprias entregas)
- Usuários logística têm acesso apenas ao módulo de Entregas (mesmas funcionalidades do admin para gestão de entregas)
- Usuários com perfil **Separação** conferem e finalizam a separação da carga (baixa em estoque) antes da liberação para o entregador; a **divergência de carga** (solicitado vs separado) é exibida no modal e a baixa é feita pelo valor real separado

---

## Conceitos Detalhados

### 1. Tempo de Expiração de Cotação

**Como funciona:**
- Ao criar uma cotação, o sistema define automaticamente a data de expiração como **24 horas** após a criação
- A cotação pode ser encerrada manualmente antes do prazo
- Após 24 horas, a cotação expira automaticamente e não aceita mais respostas dos fornecedores
- Cotações expiradas ou encerradas não podem receber novas respostas

**Status da cotação:**
- **ABERTA:** Cotação ativa, aceitando respostas dos fornecedores
- **ENCERRADA:** Cotação finalizada manualmente ou automaticamente após expiração

---

### 2. Publicação de Tabela de Preços

**Requisito obrigatório:**
- A cotação **DEVE estar ENCERRADA** para que uma tabela de preços possa ser publicada
- O sistema valida automaticamente o status da cotação antes de permitir a publicação
- Se a cotação ainda estiver ABERTA, o sistema bloqueia a publicação e exibe mensagem de erro

**Tempo de expiração da tabela:**
- Ao publicar uma tabela de preços, é necessário definir a **validade em horas**
- A validade é configurável no momento da publicação (ex: 24h, 48h, 168h, etc.)
- Após expirar, a tabela permanece ativa até que uma nova tabela seja publicada
- Apenas uma tabela pode estar **ATIVA** por vez no sistema

**Publicação não bloqueia:**
- **O sistema NÃO bloqueia** a publicação de uma nova tabela quando já existe uma ativa
- Ao publicar uma nova tabela, o sistema **arquiva automaticamente** a tabela anterior
- A tabela anterior é marcada como "ARQUIVADA" e seus preços são removidos imediatamente
- A nova tabela passa a ser a única ativa no sistema
- Isso permite atualizar preços a qualquer momento, sem precisar aguardar expiração

**Inativação Manual:**
- Permite inativar uma tabela ativa manualmente, sem precisar publicar uma nova
- Útil quando é necessário remover preços do sistema temporariamente
- Ao inativar, a tabela é arquivada e seus preços são removidos imediatamente
- Após inativar, é possível criar e publicar uma nova tabela normalmente
- Disponível no botão "Inativar" na lista de tabelas (apenas para tabelas ATIVAS)

**Status da tabela:**
- **RASCUNHO:** Tabela em edição, ainda não publicada
- **ATIVA:** Tabela publicada e em uso nas vendas
- **ARQUIVADA:** Tabela antiga, substituída por uma nova ou inativada manualmente

---

### 3. Consolidação de Vendas em Pedidos de Compra

**O que é:**
- Processo que agrupa todas as vendas de um dia e organiza por fornecedor
- Cada fornecedor recebe um pedido de compra consolidado com todos os produtos que precisa fornecer

**Como funciona:**
1. Vendedores criam pedidos de venda durante o dia (módulo Vendas)
2. Ao final do dia, o administrador executa a consolidação (botão "Consolidar dia")
3. O sistema:
   - Agrupa todas as vendas do dia selecionado
   - Identifica o fornecedor de cada produto (baseado na tabela de preços ativa)
   - Soma as quantidades por produto e fornecedor
   - Cria um pedido de compra para cada fornecedor
   - Calcula valores totais e quantidades em embalagens

**Características:**
- A consolidação é **idempotente**: pode ser executada múltiplas vezes, recriando os pedidos do zero
- Pedidos anteriores do mesmo dia são excluídos e recriados
- Cada pedido de compra contém apenas produtos de um único fornecedor
- Os pedidos podem ser enviados via WhatsApp, exportados em CSV ou impressos

---

### 4. Override (Sobrescrita de Valores)

**O que é:**
- Funcionalidade que permite **sobrescrever valores globais** por produto específico na tabela de preços
- Permite personalizar markup, margem e preço mínimo para produtos individuais

**Tipos de override:**
- **Markup/Margem:** Ao editar o percentual de markup ou margem de um produto específico, o override é ativado automaticamente
- **Preço Mínimo:** Permite definir regra de mínimo diferente para um produto (margem de segurança ou desconto máximo)
- **Preço Manual:** Permite definir um preço de venda fixo, ignorando o cálculo automático

**Como funciona:**
- Valores globais são aplicados a todos os produtos por padrão
- Ao editar um valor na linha do produto, o override é ativado automaticamente
- O produto passa a usar os valores customizados em vez dos globais
- É possível desativar o override voltando aos valores globais

**Uso prático:**
- Produtos com margem especial podem ter override de markup/margem
- Produtos com regras de desconto específicas podem ter override de preço mínimo
- Produtos com preço fixo podem usar preço manual

---

### 5. Habilitar Negociação

**O que é:**
- Controle que permite ou bloqueia a negociação de preços durante a venda
- Quando habilitado, o vendedor pode ajustar o preço dentro de limites definidos
- Quando desabilitado, o vendedor deve usar exatamente o preço da tabela

**Como funciona:**
- Configurado por produto na tabela de preços
- **Permite Negociação = true:** Vendedor pode alterar preço entre mínimo e máximo
- **Permite Negociação = false:** Vendedor deve usar exatamente o preço de venda da tabela

**Validações:**
- Se negociação desabilitada: sistema bloqueia qualquer alteração de preço
- Se negociação habilitada: sistema valida se preço está entre mínimo e máximo permitidos

**Uso prático:**
- Produtos com margem fixa: negociação desabilitada
- Produtos com flexibilidade comercial: negociação habilitada com limites definidos

---

### 6. Definir KG da Unidade de Venda

**O que é:**
- Define quantos quilogramas (kg) uma unidade de venda representa
- Útil para produtos vendidos em embalagens (ex: caixa de 5kg, pacote de 2kg)
- **Este valor é definido no cadastro do produto** e usado automaticamente na tabela de preços e vendas

**Como funciona:**
- No cadastro do produto, você define:
  - **Quantidade por Unidade (kg):** Quantos kg cada unidade de venda contém (ex: 5kg, 2kg)
  - **Embalagem:** Nome da embalagem (ex: "Caixa", "Pacote", "Saco", "1")
- Na tabela de preços, o campo **"Kg por unid. venda"** é **preenchido automaticamente** com o valor do cadastro do produto
- **Não é possível editar** este valor na tabela de preços (para alterar, edite o cadastro do produto)

**No módulo de Vendas:**
- Produtos com KG definido permitem duas formas de venda (quando permite venda fracionada):
  - **Por KG:** Vendedor informa quantidade em quilogramas
  - **Por Embalagem:** Vendedor informa quantidade de embalagens (sistema calcula kg automaticamente)
- Se o produto não permite venda fracionada, apenas a venda por unidade está disponível (números inteiros)

**Exemplo:**
- Produto: Arroz
  - Quantidade por Unidade: 5 kg
  - Embalagem: "Saco"
  - Permite Venda Fracionada: Sim
- Na tabela de preços: "Kg por unid. venda" aparece automaticamente como **5** (não editável)
- No módulo de Vendas, vendedor pode vender:
  - 10kg de arroz (modo KG)
  - 2 sacos de arroz (modo Embalagem) = 10kg automaticamente
  - 1,5 sacos = 7,5kg automaticamente (fracionado permitido)

**Benefícios:**
- Valor centralizado no cadastro do produto (fonte única da verdade)
- Facilita vendas por embalagem
- Mantém controle preciso de quantidades em kg
- Reduz erros de cálculo manual
- Consistência entre tabela de preços e vendas

---

### 7. Aplicação de Desconto na Venda

**Como funciona:**
- Para produtos com **negociação habilitada**, o vendedor pode aplicar desconto informando o **valor do desconto em reais** (não o preço final)
- O desconto é aplicado no **total do item**, não por kg
- O sistema calcula automaticamente o preço unitário a partir do desconto

**Cálculo do desconto:**
1. Vendedor informa o valor do desconto (ex: R$ 30,00)
2. Sistema calcula: `descontoPorKg = descontoValor ÷ quantidadeKg`
3. Sistema calcula: `precoUnitario = precoVendaReferencia - descontoPorKg`
4. Sistema valida: `precoUnitario >= precoMinimo`
5. Se inválido, ajusta automaticamente para o desconto máximo permitido

**Desconto máximo permitido:**
```
Desconto Máximo = (Preço de Venda - Preço Mínimo) × Quantidade (kg)
```

**Exemplo prático:**
- Produto: R$ 10,00/kg
- Preço mínimo: R$ 8,00/kg
- Quantidade: 10 kg
- Desconto máximo: (10 - 8) × 10 = **R$ 20,00**
- Vendedor informa desconto: **R$ 15,00**
- Sistema calcula: Preço unitário = 10 - (15/10) = **R$ 8,50/kg** ✓
- Se vendedor tentar desconto de R$ 25,00, sistema ajusta para R$ 20,00
- Preço unitário final: R$ 8,00/kg (no mínimo)

**Motivo do desconto:**
- Quando um desconto é aplicado, é **obrigatório** informar o motivo
- O motivo é um campo de texto livre
- Este motivo fica registrado no histórico da venda para auditoria

**Aprovação automática:**
- Quando um desconto é aplicado, o sistema registra automaticamente quem **aprovou** o desconto
- A aprovação é feita pelo usuário que criou a tabela de preços (admin que habilitou a negociação)
- Este registro fica salvo no histórico da venda junto com o valor do desconto e o motivo

**Interface:**
- Campo "Desconto (R$)" aparece apenas quando negociação está habilitada
- Mostra o desconto máximo permitido
- Exibe o preço unitário calculado (somente leitura)
- Exibe o preço mínimo para referência
- Campo "Motivo do desconto" aparece quando desconto > 0

---

### 8. Venda Fracionada

**O que é:**
- Controle que permite ou bloqueia a venda por KG e números fracionados
- Configurado no cadastro do produto através do campo **"Permite Venda Fracionada"**

**Quando Permite Venda Fracionada = TRUE:**

**No Carrinho de Vendas:**
- O vendedor pode escolher entre duas formas de venda:
  - **Por KG:** Informa quantidade em quilogramas (ex: 1,5 kg, 2,3 kg)
  - **Por Unidade de Venda:** Informa quantidade de embalagens/unidades (ex: 1,5 sacos, 2,3 caixas)
- **Ambos os modos permitem números fracionados** (ex: 1,5; 2,3; 0,75)
- O sistema calcula automaticamente a conversão entre KG e unidades

**Exemplo:**
- Produto: Arroz (Quantidade por Unidade: 5 kg, Embalagem: "Saco")
- Permite Venda Fracionada: Sim
- Vendedor pode vender:
  - 7,5 kg de arroz (modo KG)
  - 1,5 sacos de arroz (modo Embalagem) = 7,5 kg automaticamente

**Quando Permite Venda Fracionada = FALSE:**

**No Carrinho de Vendas:**
- **Apenas a opção de unidade de venda está disponível** (não aparece opção de KG)
- **Apenas números inteiros são permitidos** (ex: 1, 2, 3 unidades)
- Se o vendedor tentar digitar número fracionado, o sistema corrige automaticamente para inteiro

**Exemplo:**
- Produto: Abacaxi (Embalagem: "1")
- Permite Venda Fracionada: Não
- Vendedor pode vender:
  - Apenas 1, 2, 3 unidades (não pode 1,5 ou 2,3)
  - Não aparece opção de vender por KG

**Benefícios:**
- Controle granular sobre como cada produto pode ser vendido
- Produtos que não podem ser fracionados (ex: unidades inteiras) são protegidos automaticamente
- Produtos que podem ser fracionados oferecem mais flexibilidade ao vendedor

**Observações:**
- A configuração é feita no cadastro do produto
- Uma vez configurado, o comportamento é aplicado automaticamente em todas as vendas
- Para alterar, edite o cadastro do produto

---

### 9. Grandeza Intensiva (Preço por Unidade)

**O que é:**
- **Grandeza extensiva** depende da quantidade: preço total, peso total, volume total. Se você dobrar a quantidade, o valor dobra.
- **Grandeza intensiva** não depende do tamanho da amostra: preço por kg, preço por unidade. Permite comparar ofertas de tamanhos diferentes.

**No sistema:**
- Quando você **divide o preço pelo peso** (ou pela quantidade), você transforma uma grandeza **extensiva** (preço total) numa **intensiva** (preço por unidade, ex.: R$/kg).
- Isso permite **comparar coisas de tamanhos diferentes**: um fardo de 20 kg a R$ 100 e uma caixa de 5 kg a R$ 30 — o preço por kg (R$ 5 vs R$ 6) permite decidir qual oferta é melhor.
- Na tabela de preços e nas vendas, o sistema trabalha com **preço por kg** (e equivalência em unidades de venda) justamente para manter essa comparação consistente e para que descontos e totais sejam calculados de forma uniforme.

**Uso prático:**
- Cotações e tabelas exibem preço por kg (intensivo) além de totais (extensivos)
- Desconto na venda é aplicado no total (extensivo), e o sistema deriva o preço unitário (intensivo) para exibição e validação de mínimo

---

### 10. Validação de Preços em Vendas

**Preço abaixo do mínimo:**
- **NÃO é permitido** quando negociação está habilitada
- Sistema valida automaticamente antes de finalizar o pedido
- Se o desconto resultar em preço abaixo do mínimo, o sistema ajusta automaticamente para o desconto máximo
- O sistema nunca permite preço abaixo do mínimo

**Preço acima do preço de venda:**
- **É permitido** quando negociação está habilitada
- Sistema não bloqueia preços acima do preço de venda da tabela
- Permite vendas com margem maior que a definida na tabela

**Preço exato (sem negociação):**
- Quando negociação está **desabilitada**, o vendedor **DEVE** usar exatamente o preço da tabela
- Qualquer alteração (para mais ou para menos) é bloqueada
- Mensagem: "Produto X: negociação desabilitada (preço deve ser Y)"

**Resumo das regras:**

| Negociação | Preço < Mínimo | Preço = Tabela | Preço > Tabela |
|------------|----------------|----------------|----------------|
| **Habilitada** | ❌ Bloqueado (ajustado automaticamente) | ✅ Permitido | ✅ Permitido |
| **Desabilitada** | ❌ Bloqueado | ✅ Obrigatório | ❌ Bloqueado |

> **Importante:** o status “Permite negociação” (controle de preço) é independente do “Permite venda fracionada” (controle de quantidade). Mesmo produtos vendidos apenas por unidade inteira podem receber desconto em R$ se marcados como negociáveis na tabela.
---

## Fluxo Completo Detalhado

1. **Cadastro Base:**
   - Cadastrar produtos:
     - Informar quantidade por unidade (kg) e embalagem
     - Configurar permite compra fracionada e permite venda fracionada
   - Cadastrar pessoas (clientes, fornecedores, transportadores)
   - **Vincular produtos a fornecedores** (para facilitar cotações)

2. **Cotação:**
   - Criar cotação com título
   - Adicionar fornecedores (produtos são pré-selecionados automaticamente)
   - Ajustar quantidades estimadas se necessário
   - Sistema define expiração automática em 24 horas
   - Gerar e enviar links para fornecedores
   - Fornecedores respondem com preços
   - Visualizar e comparar resultados
   - **Encerrar cotação** (obrigatório para próxima etapa)

3. **Tabela de Preços:**
   - Criar tabela a partir da cotação encerrada
   - Selecionar fornecedor e preços para cada item
   - Configurar valores globais (markup, margem, mínimo)
   - Aplicar overrides por produto (se necessário)
   - **"Kg por unid. venda" é preenchido automaticamente** do cadastro do produto (não editável)
   - Habilitar/desabilitar negociação por produto
   - **Publicar tabela** com validade em horas

4. **Vendas:**
   - Selecionar cliente
   - Adicionar produtos ao carrinho
   - Escolher modo de venda (KG ou unidade, se produto permite venda fracionada)
   - Informar quantidades (fracionadas se permitido, inteiras se não)
   - Aplicar desconto por valor absoluto (se negociação habilitada)
   - Informar motivo do desconto (obrigatório quando há desconto)
   - Sistema valida preços (mínimo e máximo) e ajusta desconto automaticamente
   - Finalizar pedido de venda

5. **Pedidos de Compra:**
   - Consolidar vendas do dia por fornecedor
   - Visualizar pedidos consolidados
   - Enviar pedidos via WhatsApp
   - Acompanhar status de envio

6. **Estoque:**
   - Entrada automática ao marcar Pedido de Compra como **ENVIADO**
   - Saída automática via romaneio/entrega
   - Ajustes manuais para correções ou estoque inicial

7. **Entregas:**
   - Gerenciar logística de entregas

---

## Cálculos Automáticos do Sistema

### 1. Cálculo de Preço de Venda

O sistema oferece dois métodos para calcular automaticamente o preço de venda a partir do custo:

#### **Método Markup (Multiplicador)**

**Fórmula:**
```
Preço de Venda = Custo × (1 + Markup%)
```

**Exemplo:**
- Custo: R$ 10,00
- Markup: 50%
- Preço de Venda = 10,00 × (1 + 0,50) = 10,00 × 1,50 = **R$ 15,00**

**Características:**
- Markup é aplicado sobre o custo
- Fácil de entender: "adiciona X% ao custo"
- Markup pode ser maior que 100% (ex: 200% = triplica o preço)

#### **Método Margem (Percentual sobre Venda)**

**Fórmula:**
```
Preço de Venda = Custo ÷ (1 - Margem%)
```

**Exemplo:**
- Custo: R$ 10,00
- Margem: 30%
- Preço de Venda = 10,00 ÷ (1 - 0,30) = 10,00 ÷ 0,70 = **R$ 14,29**

**Características:**
- Margem é calculada sobre o preço de venda final
- Margem sempre menor que 100% (não pode ser 100% ou mais)
- Mais preciso para controlar lucro percentual sobre vendas

**Diferença prática:**
- Markup 50% = Margem ~33,33%
- Markup 100% = Margem 50%
- Markup 200% = Margem ~66,67%

**Cálculo Reverso:**
O sistema também calcula automaticamente:
- **Markup% a partir do preço:** `(Preço - Custo) ÷ Custo × 100`
- **Margem% a partir do preço:** `(Preço - Custo) ÷ Preço × 100`

---

### 2. Cálculo de Preço Mínimo

O preço mínimo define o menor valor que pode ser negociado. Existem duas regras:

#### **Margem de Segurança**

**Conceito:** Garante uma margem mínima sobre o custo, mesmo com desconto.

**Fórmula:**
```
Preço Mínimo = Custo ÷ (1 - Margem Mínima%)
```

**Exemplo:**
- Custo: R$ 10,00
- Margem Mínima: 10%
- Preço Mínimo = 10,00 ÷ (1 - 0,10) = 10,00 ÷ 0,90 = **R$ 11,11**

**Interpretação:**
- Mesmo com desconto, o produto mantém pelo menos 10% de margem sobre o custo
- Protege a rentabilidade mínima

#### **Desconto Máximo**

**Conceito:** Define o desconto máximo permitido sobre o preço de venda.

**Fórmula:**
```
Preço Mínimo = Preço de Venda × (1 - Desconto Máximo%)
```

**Exemplo:**
- Preço de Venda: R$ 15,00
- Desconto Máximo: 20%
- Preço Mínimo = 15,00 × (1 - 0,20) = 15,00 × 0,80 = **R$ 12,00**

**Interpretação:**
- Permite desconto de até 20% sobre o preço de venda
- Mais flexível para negociação, mas não garante margem mínima

**Comparação:**

| Regra | Custo | Preço Venda | Parâmetro | Preço Mínimo | Margem no Mínimo |
|-------|-------|-------------|-----------|--------------|------------------|
| **Margem Segurança 10%** | R$ 10,00 | R$ 15,00 | 10% | R$ 11,11 | 10% (garantida) |
| **Desconto Máximo 20%** | R$ 10,00 | R$ 15,00 | 20% | R$ 12,00 | ~16,67% (variável) |

---

### 3. Override (Sobrescrita) de Valores

#### **Override de Markup/Margem**

**Como funciona:**
- Valores globais são aplicados a todos os produtos por padrão
- Ao editar markup ou margem de um produto específico, o override é ativado automaticamente
- O produto passa a usar os valores customizados em vez dos globais

**Exemplo:**
- Global: Markup 50%
- Produto A: Override com Markup 60%
- Produto B: Usa global (50%)

**Cálculo:**
- Produto A: Custo R$ 10,00 → Preço = 10,00 × 1,60 = **R$ 16,00**
- Produto B: Custo R$ 10,00 → Preço = 10,00 × 1,50 = **R$ 15,00**

#### **Override de Preço Mínimo**

**Como funciona:**
- Permite definir regra de mínimo diferente para cada produto
- Pode escolher entre Margem de Segurança ou Desconto Máximo por produto
- Pode definir percentual diferente do global

**Exemplo:**
- Global: Margem de Segurança 10%
- Produto A: Override com Desconto Máximo 15%
- Produto B: Override com Margem de Segurança 15% (diferente do global)

**Cálculo:**
- Produto A (Preço R$ 15,00): Mínimo = 15,00 × 0,85 = **R$ 12,75**
- Produto B (Custo R$ 10,00): Mínimo = 10,00 ÷ 0,85 = **R$ 11,76**

**Ativação automática:**
- Ao editar modo ou percentual de mínimo na linha, o override é ativado automaticamente
- Permite personalização granular por produto

---

### 4. Sugestão de Compra em Pedidos de Compra

**O que é:**
- Sistema calcula automaticamente a quantidade sugerida de embalagens para comprar
- Considera a quantidade total necessária (em kg) e o tamanho da embalagem do fornecedor
- Arredonda para cima para evitar falta de estoque

**Quando aparece:**
- Apenas quando o produto tem `kgPorEmbalagemFornecedor` definido na tabela de preços
- Aparece no detalhe do pedido de compra para o admin

**Cálculo:**

1. **Quantidade Exata:**
   ```
   Qtd Exata = Quantidade Total (kg) ÷ KG por Embalagem
   ```

2. **Quantidade Sugerida:**
   ```
   Qtd Sugerida = Arredondar para CIMA (Qtd Exata)
   ```

3. **Sobra em KG:**
   ```
   Sobra = (Qtd Sugerida × KG por Embalagem) - Quantidade Total
   ```

**Exemplo prático:**

**Dados:**
- Quantidade necessária: 47,5 kg
- Embalagem do fornecedor: 18 kg por caixa
- Unidade: "Cx 18kg"

**Cálculo:**
1. Qtd Exata = 47,5 ÷ 18 = **2,64 caixas**
2. Qtd Sugerida = Arredondar para cima (2,64) = **3 caixas**
3. Sobra = (3 × 18) - 47,5 = 54 - 47,5 = **6,5 kg**

**Exibição no sistema:**
```
Sugestão compra (Cx 18kg): 3 (exato 2,64) • sobra 6,50 kg
```

**Benefícios:**
- Evita comprar quantidade insuficiente
- Mostra quanto sobrará (pode ser útil para estoque)
- Facilita negociação com fornecedor (quantidade arredondada)
- Admin pode decidir se compra a quantidade exata ou sugerida

**Observações:**
- A sugestão é apenas informativa
- Admin pode comprar quantidade diferente se necessário
- Sobra pode ser aproveitada para estoque ou vendas futuras

---

## Resumo dos Cálculos

### Fórmulas Principais

| Cálculo | Fórmula |
|---------|---------|
| **Preço (Markup)** | `Custo × (1 + Markup%)` |
| **Preço (Margem)** | `Custo ÷ (1 - Margem%)` |
| **Markup%** | `(Preço - Custo) ÷ Custo × 100` |
| **Margem%** | `(Preço - Custo) ÷ Preço × 100` |
| **Mínimo (Margem Segurança)** | `Custo ÷ (1 - Margem Mínima%)` |
| **Mínimo (Desconto Máximo)** | `Preço Venda × (1 - Desconto%)` |
| **Qtd Sugerida Compra** | `Arredondar↑(Qtd Total ÷ KG por Embalagem)` |

### Fluxo de Cálculo na Tabela de Preços

1. **Seleciona custo base** (da oferta do fornecedor escolhida)
2. **Aplica método de cálculo** (Markup ou Margem)
   - Usa valor global ou override do produto
3. **Calcula preço de venda** (automático ou manual)
4. **Calcula preço mínimo** (Margem Segurança ou Desconto Máximo)
   - Usa valor global ou override do produto
5. **Arredonda valores** para 2 casas decimais
6. **Exibe sugestões** (Markup e Margem) para comparação

# Vendas

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

## Venda por KG ou Unidade

**Quando o produto permite venda fracionada:**
- O carrinho exibe duas opções: **"Kg"** e **"[Embalagem]"** (ex: Saco, Caixa)
- Você pode alternar entre vender por quilogramas ou por unidade de venda
- **Ambos os modos permitem números fracionados** (ex: 1,5 kg ou 2,3 unidades)
- Ao vender por unidade, o sistema calcula automaticamente o total em kg

**Quando o produto NÃO permite venda fracionada:**
- Apenas a opção de **unidade de venda** está disponível
- **Apenas números inteiros são permitidos** (ex: 1, 2, 3 unidades)
- Não é possível vender por KG
- Mesmo assim, o sistema converte internamente a quantidade de unidades para kg usando o campo "Quantidade por Unidade (kg)" do produto (usado para estoque, cálculos e sugestão de compra)

**Exemplo:**
- Produto: Arroz (permite venda fracionada = true) — pode vender: 1,5 kg OU 2,3 sacos
- Produto: Abacaxi (permite venda fracionada = false) — pode vender: apenas 1, 2, 3 unidades (não pode 1,5)

## Aplicação de Desconto

**Como funciona:**
- Para produtos com **negociação habilitada**, você pode aplicar desconto informando o **valor do desconto em reais** (não o preço final)
- O sistema calcula automaticamente o preço unitário a partir do desconto
- O desconto é aplicado no **total do item**, não por kg
- O fato de o produto permitir ou não venda fracionada **não interfere** na negociação: um item pode vender apenas unidades inteiras e, ainda assim, aceitar desconto em R$ quando a tabela marcar "negociável"

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

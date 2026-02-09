# Conceitos Detalhados

## 1. Tempo de Expiração de Cotação

**Como funciona:**
- Ao criar uma cotação, o sistema define automaticamente a data de expiração como **24 horas** após a criação
- A cotação pode ser encerrada manualmente antes do prazo
- Após 24 horas, a cotação expira automaticamente e não aceita mais respostas dos fornecedores
- Cotações expiradas ou encerradas não podem receber novas respostas

**Status da cotação:**
- **ABERTA:** Cotação ativa, aceitando respostas dos fornecedores
- **ENCERRADA:** Cotação finalizada manualmente ou automaticamente após expiração

---

## 2. Publicação de Tabela de Preços

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

## 3. Consolidação de Vendas em Pedidos de Compra

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

## 4. Override (Sobrescrita de Valores)

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

## 5. Habilitar Negociação

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

## 6. Definir KG da Unidade de Venda

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
- Produto: Arroz — Quantidade por Unidade: 5 kg, Embalagem: "Saco", Permite Venda Fracionada: Sim
- Na tabela de preços: "Kg por unid. venda" aparece automaticamente como **5** (não editável)
- No módulo de Vendas, vendedor pode vender: 10kg, 2 sacos = 10kg, ou 1,5 sacos = 7,5kg (fracionado permitido)

**Benefícios:**
- Valor centralizado no cadastro do produto (fonte única da verdade)
- Facilita vendas por embalagem
- Mantém controle preciso de quantidades em kg
- Consistência entre tabela de preços e vendas

---

## 7. Aplicação de Desconto na Venda

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
- Produto: R$ 10,00/kg, Preço mínimo: R$ 8,00/kg, Quantidade: 10 kg
- Desconto máximo: (10 - 8) × 10 = **R$ 20,00**
- Vendedor informa desconto: **R$ 15,00** → Preço unitário = 10 - (15/10) = **R$ 8,50/kg** ✓
- Se vendedor tentar desconto de R$ 25,00, sistema ajusta para R$ 20,00

**Motivo do desconto:** Quando um desconto é aplicado, é **obrigatório** informar o motivo (texto livre), registrado no histórico para auditoria.

**Aprovação automática:** O sistema registra quem aprovou o desconto (usuário que criou a tabela de preços); registro fica no histórico da venda.

---

## 8. Venda Fracionada

**O que é:**
- Controle que permite ou bloqueia a venda por KG e números fracionados
- Configurado no cadastro do produto através do campo **"Permite Venda Fracionada"**

**Quando Permite Venda Fracionada = TRUE:**
- O vendedor pode escolher entre **Por KG** ou **Por Unidade de Venda**
- **Ambos os modos permitem números fracionados** (ex: 1,5; 2,3; 0,75)
- O sistema calcula automaticamente a conversão entre KG e unidades

**Quando Permite Venda Fracionada = FALSE:**
- **Apenas a opção de unidade de venda está disponível** (não aparece opção de KG)
- **Apenas números inteiros são permitidos** (ex: 1, 2, 3 unidades)
- Se o vendedor tentar digitar número fracionado, o sistema corrige automaticamente para inteiro

**Observações:**
- A configuração é feita no cadastro do produto
- Para alterar, edite o cadastro do produto

---

## 9. Grandeza Intensiva (Preço por Unidade)

**O que é:**
- **Grandeza extensiva** depende da quantidade: preço total, peso total. Se você dobrar a quantidade, o valor dobra.
- **Grandeza intensiva** não depende do tamanho da amostra: preço por kg, preço por unidade. Permite comparar ofertas de tamanhos diferentes.

**No sistema:**
- Ao **dividir o preço pelo peso** (ou pela quantidade), você transforma uma grandeza **extensiva** (preço total) numa **intensiva** (preço por unidade, ex.: R$/kg).
- Isso permite **comparar ofertas de tamanhos diferentes**: um fardo de 20 kg a R$ 100 e uma caixa de 5 kg a R$ 30 — o preço por kg (R$ 5 vs R$ 6) permite decidir qual oferta é melhor.
- Na tabela de preços e nas vendas, o sistema trabalha com **preço por kg** (e equivalência em unidades de venda) para manter essa comparação consistente e para que descontos e totais sejam calculados de forma uniforme.

**Uso prático:**
- Cotações e tabelas exibem preço por kg (intensivo) além de totais (extensivos)
- Desconto na venda é aplicado no total (extensivo), e o sistema deriva o preço unitário (intensivo) para exibição e validação de mínimo
- **Produtos industrializados (ex.: suco por caixa):** aplica-se normalização com **preço de unidade base** — quantidade em **unidades**, não em kg; as grandezas extensivas (kg) não são o foco e não há conversão real para kg; o sistema trabalha com R$/unidade.

---

## 10. Validação de Preços em Vendas

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

> **Importante:** o status "Permite negociação" (controle de preço) é independente do "Permite venda fracionada" (controle de quantidade). Mesmo produtos vendidos apenas por unidade inteira podem receber desconto em R$ se marcados como negociáveis na tabela.

---

## Fluxo Completo Detalhado

1. **Cadastro Base:**
   - Cadastrar produtos: quantidade por unidade (kg), embalagem, permite compra fracionada e permite venda fracionada
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
   - Saída automática via romaneio/entrega (ao finalizar separação)
   - Ajustes manuais para correções ou estoque inicial

7. **Entregas:**
   - Gerenciar logística de entregas (consolidação, atribuição, separação, status em tempo real)
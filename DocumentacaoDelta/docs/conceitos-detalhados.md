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

**Status da tabela:**
- **RASCUNHO:** Tabela em edição, ainda não publicada
- **ATIVA:** Tabela publicada e em uso nas vendas
- **ARQUIVADA:** Tabela antiga, substituída por uma nova

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
- Permite definir quantos quilogramas (kg) uma unidade de venda representa
- Útil para produtos vendidos em embalagens (ex: caixa de 5kg, pacote de 2kg)

**Como funciona:**
- Na tabela de preços, é possível definir:
  - **Unidade de Venda:** Label da embalagem (ex: "Caixa", "Pacote", "Saco")
  - **KG por Unidade:** Quantos kg cada unidade contém (ex: 5kg, 2kg)

**No módulo de Vendas:**
- Produtos com KG definido permitem duas formas de venda:
  - **Por KG:** Vendedor informa quantidade em quilogramas
  - **Por Embalagem:** Vendedor informa quantidade de embalagens (sistema calcula kg automaticamente)

**Exemplo:**
- Produto: Arroz
- Unidade de Venda: "Saco"
- KG por Unidade: 5
- Vendedor pode vender:
  - 10kg de arroz (modo KG)
  - 2 sacos de arroz (modo Embalagem) = 10kg automaticamente

**Benefícios:**
- Facilita vendas por embalagem
- Mantém controle preciso de quantidades em kg
- Reduz erros de cálculo manual

---

## 7. Validação de Preços em Vendas

**Preço abaixo do mínimo:**
- **NÃO é permitido** quando negociação está habilitada
- Sistema valida automaticamente antes de finalizar o pedido
- Se o preço informado estiver abaixo do mínimo, o sistema bloqueia e exibe mensagem de erro
- Mensagem: "Produto X: preço abaixo do mínimo permitido (mínimo Y)"

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
| **Habilitada** | ❌ Bloqueado | ✅ Permitido | ✅ Permitido |
| **Desabilitada** | ❌ Bloqueado | ✅ Obrigatório | ❌ Bloqueado |

---

## Fluxo Completo Detalhado

1. **Cadastro Base:**
   - Cadastrar produtos (com unidade de medida)
   - Cadastrar pessoas (clientes, fornecedores, transportadores)

2. **Cotação:**
   - Criar cotação com produtos e fornecedores
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
   - Definir KG por unidade de venda (se aplicável)
   - Habilitar/desabilitar negociação por produto
   - **Publicar tabela** com validade em horas

4. **Vendas:**
   - Selecionar cliente
   - Adicionar produtos ao carrinho
   - Ajustar preços (se negociação habilitada)
   - Sistema valida preços (mínimo e máximo)
   - Finalizar pedido de venda

5. **Pedidos de Compra:**
   - Consolidar vendas do dia por fornecedor
   - Visualizar pedidos consolidados
   - Enviar pedidos via WhatsApp
   - Acompanhar status de envio

6. **Entregas:**
   - Gerenciar logística de entregas
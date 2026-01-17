# Módulos do Sistema Delta

Documentação dos módulos disponíveis para o usuário final.

---

## 1. Produtos

**Função:** Cadastro e gestão de produtos do catálogo.

**Funcionalidades:**
- Cadastrar produtos com nome, categoria, unidade de medida, NCM e observações
- Editar e excluir produtos existentes
- Buscar produtos por nome ou categoria
- Importar produtos em lote via CSV
- Validação de duplicatas (nome + categoria)

**Uso:** Base de dados de produtos utilizada em cotações, tabelas de preços e vendas.

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

**Uso:** Cadastro centralizado de todas as pessoas que interagem com o sistema.

---

## 3. Cotações

**Função:** Criar cotações de preços e coletar ofertas dos fornecedores.

**Funcionalidades:**
- Criar cotação com título, produtos e quantidades estimadas
- Adicionar fornecedores à cotação
- Gerar links únicos para cada fornecedor responder
- Enviar links via WhatsApp automaticamente
- Visualizar respostas dos fornecedores
- Encerrar cotação manualmente ou automaticamente após 24 horas
- Visualizar resultados consolidados com comparação de preços
- Excluir cotações (com ou sem tabela vinculada)

**Fluxo:**
1. Criar cotação com produtos e fornecedores
2. Gerar e enviar links para fornecedores
3. Fornecedores acessam link público e respondem com preços
4. Visualizar resultados e comparar ofertas
5. Encerrar cotação quando concluída

**Uso:** Processo de cotação de preços para seleção de fornecedores.

---

## 4. Tabela de Preços

**Função:** Criar tabelas de preços de venda baseadas em cotações encerradas.

**Funcionalidades:**
- Criar tabela de preços a partir de cotação encerrada
- Selecionar fornecedor e preços para cada item
- Publicar tabela para uso em vendas
- Visualizar tabelas ativas e arquivadas
- Editar itens da tabela antes de publicar
- Arquivar tabelas antigas

**Uso:** Define os preços de venda dos produtos após análise das cotações.

---

## 5. Vendas

**Função:** Criar pedidos de venda para clientes.

**Funcionalidades:**
- Selecionar cliente
- Adicionar produtos ao carrinho com quantidades
- Visualizar preços da tabela ativa
- Buscar produtos por nome ou categoria
- Finalizar pedido de venda
- Agrupar pedidos por cliente e data

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

## 7. Entregas

**Função:** Gestão de entregas e transportadores.

**Funcionalidades:**
- Visualizar entregas programadas
- Associar transportadores às entregas
- Acompanhar status das entregas

**Uso:** Controle logístico de entregas.

---

## 8. Usuários

**Função:** Gestão de usuários do sistema.

**Funcionalidades:**
- Criar usuários com email e senha
- Definir perfil (admin ou vendedor)
- Ativar/desativar usuários
- Editar dados de usuários
- Excluir usuários
- Buscar usuários por email

**Perfis:**
- **Admin:** Acesso completo a todos os módulos
- **Vendedor:** Acesso apenas ao módulo de Vendas

**Uso:** Controle de acesso e permissões do sistema.

---

## 9. Tabela de Preços de Venda

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
6. **Entregas:** Gerenciar logística

---

## Observações Importantes

- Cotações expiram automaticamente após 24 horas
- Apenas uma tabela de preços pode estar ativa por vez
- Pedidos de compra são gerados automaticamente a partir das vendas
- Links de cotação são únicos e válidos por 24 horas
- Usuários vendedores têm acesso limitado apenas ao módulo de Vendas

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

**Status da tabela:**
- **RASCUNHO:** Tabela em edição, ainda não publicada
- **ATIVA:** Tabela publicada e em uso nas vendas
- **ARQUIVADA:** Tabela antiga, substituída por uma nova

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

### 7. Validação de Preços em Vendas

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

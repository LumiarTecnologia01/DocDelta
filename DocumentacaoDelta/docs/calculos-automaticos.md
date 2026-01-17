# Cálculos Automáticos do Sistema

## 1. Cálculo de Preço de Venda

O sistema oferece dois métodos para calcular automaticamente o preço de venda a partir do custo:

### **Método Markup (Multiplicador)**

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

### **Método Margem (Percentual sobre Venda)**

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

## 2. Cálculo de Preço Mínimo

O preço mínimo define o menor valor que pode ser negociado. Existem duas regras:

### **Margem de Segurança**

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

### **Desconto Máximo**

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

## 3. Override (Sobrescrita) de Valores

### **Override de Markup/Margem**

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

### **Override de Preço Mínimo**

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

## 4. Sugestão de Compra em Pedidos de Compra

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
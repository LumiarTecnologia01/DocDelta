# Produtos

**Função:** Cadastro e gestão de produtos do catálogo.

**Funcionalidades:**
- Cadastrar produtos com nome, categoria, unidade de medida, NCM e observações
- Definir o **tipo do produto** (COMMODITY ou INDUSTRIALIZADO)
- Editar e excluir produtos existentes
- Buscar produtos por nome ou categoria
- Importar produtos em lote via CSV
- Validação de duplicatas (nome + categoria)

## Campos do Cadastro

### Campos Básicos

- **Nome:** Nome do produto (obrigatório)
- **Categoria:** Categoria do produto (obrigatório)
- **Unidade de Medida:** Unidade padrão (ex: KG, UN, CX) (obrigatório)
- **NCM:** Código NCM de 8 dígitos (obrigatório)
- **Observações:** Informações adicionais sobre o produto
- **Tipo de Produto:** Define como o preço é formado
  - **COMMODITY:** preço vem de cotação diária (hortifruti)
  - **INDUSTRIALIZADO:** preço pode ser definido manualmente (ex: sucos)

### Campos de Unidade de Venda

- **Quantidade por Unidade (kg):** Quantidade em quilogramas que representa uma unidade de venda padrão (obrigatório)
  - Exemplo: Se o produto é vendido em "Saco de 5kg", informe 5
  - Este valor é usado automaticamente na tabela de preços e vendas
  - Deve ser maior que zero
- **Volume:** Campo numérico (quando aplicável)
- **Embalagem:** Nome da embalagem/unidade de venda (opcional)
  - Exemplo: "Saco", "Caixa", "Pacote", "1" (para unidade simples)
  - A embalagem aparece nas vendas quando o produto é vendido por unidade de venda

### Controles de Venda e Compra

- **Permite Compra Fracionada:** Quando marcado, permite comprar quantidades fracionadas do produto (ex: 1,5 unidades)
- **Permite Venda Fracionada:** Quando marcado:
  - Habilita opção de venda por KG no carrinho (além da unidade de venda)
  - Permite números fracionados tanto em KG quanto em unidade de venda (ex: 1,5; 2,3)
  - Quando desmarcado: apenas unidade de venda, apenas números inteiros

**Uso:** Base de dados de produtos utilizada em cotações, tabelas de preços e vendas.

## Diferença entre COMMODITY e INDUSTRIALIZADO

- **COMMODITY:** precisa de cotação diária para formar preço; entra no fluxo padrão de cotação → tabela de preços → vendas.
- **INDUSTRIALIZADO:** não exige cotação; pode ter preço manual na tabela e continua vendendo normalmente.

## Produtos vendidos por fardo/caixa (“industrializados”) e normalização

Para produtos industrializados (ex.: suco, fardo, caixa), aplica-se o conceito de **normalização / grandeza intensiva**:

- A grandeza relevante é **quantidade por unidade** (unidade de venda), e não kg.
- As grandezas extensivas (peso total em kg) **não são, de fato, o foco**: não há conversão real para kg como base do negócio.
- O sistema trabalha com **preço de unidade base**: o preço é por unidade (ex.: por caixa, por fardo), permitindo comparação e negociação de forma consistente.
- Exemplo: suco vendido por caixa — quantidade em **unidades** (caixas), preço por **unidade base** (R$/un.); o kg não é usado como referência principal para esse tipo de produto.

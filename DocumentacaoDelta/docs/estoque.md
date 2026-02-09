# Estoque

**Função:** Controlar o saldo real de produtos (entrada, saída e ajustes).

**Como funciona:**
- O **saldo de estoque nunca é alterado diretamente**. Toda mudança gera uma **movimentação** registrada no histórico.
- **Entrada automática:** quando um Pedido de Compra é marcado como **ENVIADO**, os itens entram no estoque.
- **Baixa (saída) automática:** quando a **Separação** é finalizada no módulo de Entregas, o sistema registra a **baixa em estoque** com as quantidades realmente separadas (por romaneio). Essa saída é do tipo "SAIDA" com origem "ROMANEIO" e atualiza o saldo em kg.
- **Ajustes manuais:** usados para corrigir divergências, perdas, quebra ou estoque inicial.
- As movimentações são registradas conforme o produto: em **kg** quando a base é peso (ex.: commodities), ou em **unidade de venda** quando o produto é industrializado com preço por unidade base (ex.: suco por caixa), sem conversão para kg — em linha com o conceito de grandeza intensiva / normalização.

## Ajustes disponíveis na tela de Estoque (Admin)

1. **Ajustar por diferença**
   - Informar a quantidade a adicionar/remover.
2. **Definir saldo final**
   - Informar o saldo desejado (o sistema calcula a diferença e cria a movimentação).

**Exemplos práticos:**
- **Estoque inicial:** Produto sem saldo → define "saldo final = 100 kg" → entrada de 100 kg.
- **Contagem física:** Saldo atual 83 kg → informar saldo final 100 kg → entrada de 17 kg.

**Uso:** Garantir histórico auditável e saldo real atualizado.

# Fluxo Completo do Sistema

## Visão Geral

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

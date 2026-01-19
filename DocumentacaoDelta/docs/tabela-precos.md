# Tabela de Preços

**Função:** Criar tabelas de preços de venda baseadas em cotações encerradas.

**Funcionalidades:**
- Criar tabela de preços a partir de cotação encerrada
- Selecionar fornecedor e preços para cada item
- Publicar tabela para uso em vendas
- Visualizar tabelas ativas e arquivadas
- Editar itens da tabela antes de publicar
- Arquivar tabelas antigas
- **Inativar manualmente** tabelas ativas (quando necessário criar nova tabela antes da expiração)
- Filtrar tabelas por data de criação

## Publicação de Tabela

**Não bloqueia:**
- **O sistema NÃO bloqueia** a publicação de uma nova tabela quando já existe uma ativa
- Ao publicar uma nova tabela, o sistema **arquiva automaticamente** a tabela anterior
- A tabela anterior é marcada como "ARQUIVADA" e seus preços são removidos imediatamente
- A nova tabela passa a ser a única ativa no sistema
- Isso permite atualizar preços a qualquer momento, sem precisar aguardar expiração

## Inativação Manual

- Permite inativar uma tabela ativa manualmente, sem precisar publicar uma nova
- Útil quando é necessário remover preços do sistema temporariamente
- Ao inativar, a tabela é arquivada e seus preços são removidos imediatamente
- Após inativar, é possível criar e publicar uma nova tabela normalmente
- Disponível no botão "Inativar" na lista de tabelas (apenas para tabelas ATIVAS)

## Status da Tabela

- **RASCUNHO:** Tabela em edição, ainda não publicada
- **ATIVA:** Tabela publicada e em uso nas vendas
- **ARQUIVADA:** Tabela antiga, substituída por uma nova ou inativada manualmente

**Uso:** Define os preços de venda dos produtos após análise das cotações.
# Tabela de Preços

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

## Campo "Kg por unid. venda"

- Este campo é **preenchido automaticamente** com o valor de "Quantidade por Unidade (kg)" do cadastro do produto
- O campo aparece na tabela de preços mas **não é editável**
- Para alterar este valor, edite o cadastro do produto
- Garante consistência entre o cadastro do produto e a tabela de preços

## Publicação de Tabela

**Não bloqueia:**
- **O sistema NÃO bloqueia** a publicação de uma nova tabela quando já existe uma ativa
- Ao publicar uma nova tabela, o sistema **arquiva automaticamente** a tabela anterior
- A tabela anterior é marcada como "ARQUIVADA" e seus preços são removidos imediatamente
- A nova tabela passa a ser a única ativa no sistema

## Inativação Manual

- Permite inativar uma tabela ativa manualmente, sem precisar publicar uma nova
- Útil quando é necessário remover preços do sistema temporariamente
- Ao inativar, a tabela é arquivada e seus preços são removidos imediatamente
- Após inativar, é possível criar e publicar uma nova tabela normalmente

## Status da Tabela

- **RASCUNHO:** Tabela em edição, ainda não publicada
- **ATIVA:** Tabela publicada e em uso nas vendas
- **ARQUIVADA:** Tabela antiga, substituída por uma nova ou inativada manualmente

## Produtos INDUSTRIALIZADOS na Tabela de Preços (sem cotação)

- Após selecionar o produto, o sistema lista **apenas fornecedores vinculados** a ele
- Itens industrializados aparecem com badge **"Industrializado"**
- É possível **remover** itens industrializados enquanto a tabela estiver em **RASCUNHO** e o item **não tiver vendas**

**Uso:** Define os preços de venda dos produtos após análise das cotações.

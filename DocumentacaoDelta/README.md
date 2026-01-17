# Documentação Sistema Delta - VitePress

Documentação do Sistema Delta gerada com VitePress e hospedada no GitHub Pages.

## 🚀 Desenvolvimento Local

### Pré-requisitos

- Node.js 18+ 
- npm ou pnpm

### Instalação

```bash
npm install
```

### Executar em modo desenvolvimento

```bash
npm run dev
```

A documentação estará disponível em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

Os arquivos gerados estarão em `docs/.vitepress/dist`

## 📝 Estrutura

```
DocumentacaoDelta/
├── docs/                    # Arquivos markdown da documentação
│   ├── index.md            # Página inicial
│   ├── produtos.md
│   ├── pessoas.md
│   ├── cotacoes.md
│   └── ...                 # Outros módulos
├── .vitepress/
│   └── config.ts           # Configuração do VitePress
└── package.json
```

## 🔄 Sidebar Automática

A sidebar é gerada automaticamente a partir dos arquivos `.md` na pasta `docs/`. 

**Para adicionar um novo módulo:**
1. Crie um novo arquivo `.md` na pasta `docs/`
2. O arquivo aparecerá automaticamente na sidebar (ordenado alfabeticamente ou conforme a ordem definida em `config.ts`)

**Ordem dos módulos:**
A ordem pode ser personalizada editando o array `order` na função `generateSidebar()` em `.vitepress/config.ts`

## 📦 Deploy no GitHub Pages

O deploy é automático via GitHub Actions quando há push na branch `main`.

### Configuração Manual

1. **Ajustar base path no config.ts:**
   ```ts
   base: '/DocDelta/', // Nome do seu repositório
   ```

2. **Habilitar GitHub Pages:**
   - Vá em Settings > Pages
   - Source: GitHub Actions

3. **Push para main:**
   O workflow `.github/workflows/deploy.yml` fará o build e deploy automaticamente.

## 📚 Documentação VitePress

- [Documentação oficial do VitePress](https://vitepress.dev/)
import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// Gera sidebar automaticamente com base nos .md dentro de /docs
function generateSidebar() {
  const docsPath = resolve(__dirname, '..') // .../docs
  const files = readdirSync(docsPath)

  const mdFiles = files
    .filter(file => file.endsWith('.md'))
    .filter(file => file !== 'index.md')
    .filter(file => file !== 'delta.md') // arquivo legado (opcional)

  // Ordem preferida (quem não estiver aqui vai pro final, em ordem alfabética)
  const order = [
    'produtos',
    'pessoas',
    'cotacoes',
    'tabela-precos',
    'vendas',
    'pedidos-compra',
    'entregas',
    'usuarios',
    'fluxo-sistema',
    'conceitos-detalhados',
    'calculos-automaticos',
  ]

  const sortedFiles = mdFiles.sort((a, b) => {
    const nameA = a.replace(/\.md$/, '')
    const nameB = b.replace(/\.md$/, '')
    const indexA = order.indexOf(nameA)
    const indexB = order.indexOf(nameB)

    if (indexA === -1 && indexB === -1) return nameA.localeCompare(nameB)
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    return indexA - indexB
  })

  const items = sortedFiles.map(file => {
    const name = file.replace(/\.md$/, '')
    return { text: titleFromSlug(name), link: `/${name}` }
  })

  return [{ text: 'Módulos', items }]
}

// Base path: '/' no dev e '/NOME-DO-REPO/' no GitHub Pages
const isDev = process.env.NODE_ENV !== 'production' && !process.env.CI

export default defineConfig({
  base: isDev ? '/' : '/DocDelta/',
  title: 'Sistema Delta - Documentação',
  description: 'Documentação completa dos módulos do Sistema Delta',
  themeConfig: {
    sidebar: generateSidebar(),
    nav: [{ text: 'Início', link: '/' }],
  },
})

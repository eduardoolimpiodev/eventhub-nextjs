# EventHub - Sistema de Gerenciamento de Eventos

Sistema de busca e gerenciamento de eventos, desenvolvido com Next.js 14, TypeScript e Tailwind CSS. Integrado com a API Ticketmaster para exibir eventos.

## Tecnologias

- Next.js 14 - Framework React com App Router
- TypeScript - Tipagem estática
- Tailwind CSS - Estilização moderna e responsiva
- Zustand - Gerenciamento de estado (favoritos)
- Ticketmaster API - Dados de eventos reais

## Decisões Técnicas

### Arquitetura

**Next.js 14 com App Router**
- Escolhido para aproveitar Server Components e melhorar performance
- File-based routing simplifica a estrutura de rotas
- Suporte nativo a SSR/SSG melhora SEO comparado ao SPA legado
- Otimizações automáticas de bundle e code splitting

**TypeScript**
- Adotado para prevenir erros em tempo de desenvolvimento
- Interfaces tipadas para eventos da API Ticketmaster garantem consistência
- Facilita refatoração e manutenção do código
- Autocomplete e IntelliSense melhoram produtividade

### Estilização

**Tailwind CSS**
- Substituiu CSS modules do projeto legado
- Utility-first approach reduz tamanho do CSS final
- Design system consistente através de configuração centralizada
- Responsividade simplificada com breakpoints predefinidos
- Purge automático remove classes não utilizadas

**Variáveis CSS mantidas**
- Cores primárias e secundárias definidas no `tailwind.config.ts`
- Mantém compatibilidade visual com projeto legado
- Facilita futuras alterações de tema

### Gerenciamento de Estado

**Zustand ao invés de Context API**
- Mais performático que Context API (menos re-renders)
- API mais simples e menos boilerplate
- Middleware de persistência integrado para localStorage
- Store isolado facilita testes unitários
- Melhor suporte a TypeScript

**Decisão de limite de 5 eventos salvos**
- Mantido do projeto legado para consistência
- Evita uso excessivo de localStorage
- Incentiva curadoria de eventos favoritos

**Por que não RxJS?**
- Complexidade desnecessária para os casos de uso do projeto
- RxJS adicionaria ~50kb ao bundle final
- Async/await é mais familiar e suficiente para as necessidades
- Debounce implementado com `setTimeout` simples
- Chamadas de API resolvidas com Promises nativas
- RxJS seria útil apenas com: WebSockets, streams em tempo real, múltiplas fontes de dados combinadas, ou retry logic complexo

### Integração com API

**Client-side fetching**
- Eventos são buscados no cliente para dados em tempo real
- Permite debounce na busca (500ms) para reduzir chamadas
- Cache do Next.js (revalidate) para eventos populares na home

**Promises e Async/Await**
- Padrão nativo do JavaScript para operações assíncronas
- Mais simples e direto que observables para este caso de uso
- Código mais legível e fácil de manter
- Suporte nativo do TypeScript sem bibliotecas adicionais
- Adequado para chamadas HTTP simples sem necessidade de streams

**Tratamento de erros robusto**
- Try-catch em todas as chamadas de API
- Estados de loading e erro em todas as páginas
- Mensagens amigáveis ao usuário
- Fallbacks para dados ausentes da API

### Componentes

**Separação de responsabilidades**
- Componentes de UI isolados (`navbar`, `footer`, `event-card`)
- Lógica de negócio em helpers (`lib/helpers.ts`)
- Integração com API centralizada (`lib/ticketmaster-api.ts`)
- Types compartilhados em `types/event.ts`

**Client Components estratégicos**
- Apenas componentes com interatividade marcados como `'use client'`
- Maximiza uso de Server Components para melhor performance
- Reduz JavaScript enviado ao cliente

### Performance

**Otimização de imagens**
- `next/image` com lazy loading automático
- Sizes responsivos para diferentes viewports
- Formato WebP automático quando suportado
- Placeholder blur para melhor UX

**Code splitting**
- Rotas carregadas sob demanda
- Componentes pesados podem ser lazy-loaded se necessário
- Zustand carrega apenas quando necessário

### Acessibilidade

**Semântica HTML**
- Tags apropriadas (`nav`, `main`, `footer`, `section`)
- Hierarquia de headings correta
- Labels em inputs e botões

**ARIA attributes**
- `aria-label` em botões de ícone
- Estados de loading comunicados adequadamente

### SEO

**Metadata**
- Title e description configuráveis por página
- Open Graph tags para compartilhamento social
- Canonical URLs para evitar conteúdo duplicado

**Structured data**
- Potencial para adicionar JSON-LD para eventos
- URLs semânticas (`/evento/[id]`)

### Segurança

**Variáveis de ambiente**
- API key da Ticketmaster em variável de ambiente
- Prefixo `NEXT_PUBLIC_` para variáveis do cliente
- `.env.local` no `.gitignore`

**Validação de dados**
- Type guards para dados da API
- Sanitização de inputs de busca
- Proteção contra XSS através do React

### Testes e Qualidade

**ESLint**
- Configuração padrão do Next.js
- Regras de TypeScript habilitadas
- Garante consistência de código

**Type checking**
- Build falha se houver erros de tipo
- Previne bugs em produção

### Deploy

**Vercel como plataforma recomendada**
- Integração nativa com Next.js
- Deploy automático via Git
- Edge network global
- Preview deployments para PRs
- Variáveis de ambiente gerenciadas

**Alternativas suportadas**
- Netlify, Railway, AWS Amplify
- Qualquer plataforma com suporte a Node.js

### Migração do Legado

**Abordagem incremental**
- Componentes migrados um por vez
- Visual mantido pixel-perfect
- Funcionalidades preservadas
- Melhorias de performance e DX

**Compatibilidade**
- Mesma API (Ticketmaster)
- Mesmos dados salvos (localStorage com mesma chave)
- URLs similares para facilitar transição

## Funcionalidades

### HomePage (/)
- Hero section com gradiente
- Grid de 6 eventos populares
- Seção de features
- Loading states e tratamento de erros

### Buscar Eventos (/buscar)
- Barra de busca com debounce (500ms)
- Filtros colapsáveis (cidade, categoria, datas, preço)
- Grid responsivo de resultados
- Estados vazios e de erro

### Eventos Salvos (/salvos)
- Lista de até 5 eventos favoritos
- Contador dinâmico na navbar
- Persistência com localStorage (Zustand)
- Botão "Limpar Todos"

### Detalhes do Evento (/evento/[id])
- Imagem hero em tela cheia
- Informações completas do evento
- Botão salvar/remover favorito
- Link para comprar ingressos

### Componentes
- Navbar com links ativos e contador
- Footer responsivo
- EventCard com hover effects
- Loading spinners
- Estados de erro

## Instalação

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Chave da API Ticketmaster

### Passo a Passo

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd eventhub-nextjs
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_TICKETMASTER_API_KEY=sua_chave_aqui
```

Como obter a chave da API:
1. Acesse https://developer.ticketmaster.com/
2. Crie uma conta gratuita
3. Crie um novo app
4. Copie a "Consumer Key"

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

5. Acesse a aplicação

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

```
eventhub-nextjs/
├── app/                      # App Router do Next.js
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # HomePage
│   ├── buscar/              # Página de busca
│   ├── salvos/              # Página de favoritos
│   └── evento/[id]/         # Página de detalhes
├── components/              # Componentes reutilizáveis
│   ├── navbar.tsx
│   ├── footer.tsx
│   └── event-card.tsx
├── lib/                     # Utilitários e helpers
│   ├── ticketmaster-api.ts  # Integração com API
│   └── helpers.ts           # Funções auxiliares
├── store/                   # Gerenciamento de estado
│   └── saved-events.ts      # Store Zustand
├── types/                   # Definições TypeScript
│   └── event.ts
└── public/                  # Arquivos estáticos

```

## Design System

### Cores

```css
--primary: #6366f1        /* Indigo */
--primary-dark: #4f46e5   /* Indigo escuro */
--secondary: #ec4899      /* Pink */
```

### Tipografia

- Títulos: Font weight 700-800
- Corpo: Font weight 400-500
- Tamanhos: 14px - 48px

### Componentes

- Cards: Border radius 12px, shadow-sm
- Botões: Border radius 8px, transições suaves
- Inputs: Border radius 8px, focus ring

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter
```

## API Ticketmaster

### Endpoints Utilizados

- `GET /discovery/v2/events.json` - Lista eventos
- `GET /discovery/v2/events/{id}.json` - Detalhes do evento

### Parâmetros de Busca

- `keyword` - Termo de busca
- `city` - Cidade
- `classificationName` - Categoria
- `startDateTime` - Data início
- `endDateTime` - Data fim
- `size` - Quantidade de resultados
- `page` - Página atual

## Gerenciamento de Estado

### Zustand Store (Favoritos)

```typescript
interface SavedEventsState {
  savedEvents: SavedEvent[]
  addEvent: (event: SavedEvent) => void
  removeEvent: (eventId: string) => void
  isEventSaved: (eventId: string) => boolean
  clearAll: () => void
}
```

Limite: 5 eventos salvos  
Persistência: localStorage

## Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no [Vercel](https://vercel.com)
2. Configure a variável de ambiente `NEXT_PUBLIC_TICKETMASTER_API_KEY`
3. Deploy automático

### Outras Plataformas

- Netlify: Suporte nativo para Next.js
- Railway: Deploy com Docker
- AWS Amplify: Integração com AWS

## Licença

Este projeto foi desenvolvido como migração de um sistema legado React para Next.js 14.

## Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Desenvolvido usando Next.js 14

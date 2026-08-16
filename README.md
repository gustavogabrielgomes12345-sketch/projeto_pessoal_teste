# Blog Template — Estrutura Reciclável

Estrutura de blog 100% front-end (HTML + CSS + JS puro, sem frameworks),
pensada para SEO no Google e performance. Sem conteúdo — só a base para
você reutilizar em qualquer projeto.

## Estrutura de pastas

```
blog-template/
├── index.html              → página inicial (listagem de posts)
├── 404.html                → página de erro customizada
├── robots.txt              → controle de indexação
├── sitemap.xml             → mapa do site para o Google
├── rss.xml                 → feed RSS
├── manifest.json           → PWA (ícone, cor de tema, instalável)
├── sw.js                   → service worker (cache offline, opcional)
├── .htaccess                → compressão, cache e HTTPS (hospedagem Apache)
├── css/
│   └── style.css           → reset + design tokens + layout + componentes
├── js/
│   └── main.js              → menu mobile, dark mode, progresso de leitura
├── img/                     → imagens (thumbs, capas, ícones, favicon)
└── posts/
    └── _template-post.html → modelo para cada novo post
```

## Como reutilizar

1. **Novo post**: copie `posts/_template-post.html`, renomeie o arquivo
   e troque título, meta tags, JSON-LD e conteúdo. Depois adicione uma
   entrada em `index.html` (card) e em `sitemap.xml`.
2. **Identidade visual**: troque só os tokens no topo do `style.css`
   (`:root { --color-... --font-... }`). O resto do CSS se adapta sozinho.
3. **Domínio**: substitua todas as ocorrências de `seudominio.com` pelo
   domínio real (title, canonical, og:url, JSON-LD, sitemap, robots, rss).

## O que já vem pronto

**SEO**
- Meta tags essenciais (title, description, canonical, robots)
- Open Graph + Twitter Card para compartilhamento
- JSON-LD (`Blog`, `BlogPosting`, `BreadcrumbList`) para rich results
- `sitemap.xml`, `robots.txt`, `rss.xml`
- HTML semântico (`header`, `main`, `article`, `nav`, `footer`)
- Hierarquia de headings correta (um único `<h1>` por página)

**Performance**
- Zero frameworks/dependências externas — só HTML/CSS/JS puro
- `loading="lazy"` e `decoding="async"` em imagens abaixo da dobra
- `fetchpriority="high"` na imagem de capa (ajuda o LCP)
- `width`/`height` em todas as imagens (evita layout shift/CLS)
- `srcset`/`sizes` para imagens responsivas
- CSS com variáveis (fácil de sobrescrever sem duplicar regras)
- Service worker opcional para cache de assets estáticos
- Regras de cache/compressão via `.htaccess` (Apache)

**UX/Acessibilidade**
- Dark mode com persistência em `localStorage`
- Menu mobile funcional (sem JS de terceiros)
- Skip link, `:focus-visible`, `prefers-reduced-motion`
- Totalmente responsivo (mobile-first)

## O que você precisa preencher

- Conteúdo real de cada post
- Imagens (thumbs, capas, favicon, ícones do manifest)
- URLs reais (domínio, redes sociais, comentários)
- Sistema de comentários (Disqus, utterances, giscus etc. — há um
  placeholder em `#comments-widget` no template de post)
- Automação de `sitemap.xml`/`rss.xml` se o volume de posts crescer
  (pode ser um script simples no seu processo de build/deploy)

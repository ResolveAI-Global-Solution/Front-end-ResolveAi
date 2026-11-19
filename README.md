# ResolveAI · Front-end

> Plataforma de ocorrências e transparência urbana. O morador registra um problema do bairro, os vizinhos confirmam, todo mundo acompanha a resolução e compara como cada região responde.

Projeto da **Global Solution 2026/2 (FIAP) · tema CitizenTech** · disciplina **Front-End Design Engineering**
Empresa: **ResolveAi** · Turma: **1TDSPW**

---

## 🔗 Links

| | |
|---|---|
| **Aplicação (Vercel)** | https://resolve-ai-half-tech.vercel.app/ |
| **Repositório (GitHub)** | https://github.com/ResolveAI-Global-Solution/Front-end-ResolveAi |
| **API Java (Render)** | https://resolveai-api-3tvg.onrender.com |
| **Vídeo (YouTube)** | `PREENCHER: https://youtu.be/<id>` |

> A API está no plano gratuito do Render, que "dorme" depois de um tempo sem uso. Se a primeira tela demorar para carregar, espere alguns segundos e atualize.

---

## 🎯 Objetivo

Em São Paulo, um pedido de conserto de calçada no SP156 leva em média 33 dias para ser atendido, e cada pedido é individual: quase ninguém vê o que aconteceu com ele. O **ResolveAI** transforma esses pedidos isolados em força coletiva e transparente:

1. **Registrar** · o morador descreve o problema e marca o local no mapa.
2. **Apoiar** · vizinhos a até 500 m tocam em "Eu também vi". Com dois apoios, a ocorrência vira **confirmada**.
3. **Acompanhar** · status e histórico de cada ocorrência, do registro à resolução.
4. **Comparar** · o placar mostra como cada região responde, com % resolvido e tempo médio.

**ODS relacionados:** 11 (Cidades e comunidades sustentáveis) e 10 (Redução das desigualdades).

Este repositório é o front-end da solução: uma SPA em React + Vite + TypeScript que consome a API REST em Java (disciplina de Domain Driven Design Using Java).

---

## 🛠️ Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| **React 19** | Interface em componentes |
| **Vite 8** | Build e servidor de desenvolvimento |
| **TypeScript** | Tipagem de props, estados e respostas da API |
| **Tailwind CSS 4** | Estilização e responsividade (plugin `@tailwindcss/vite`) |
| **React Router 7** | Rotas estáticas e dinâmicas da SPA |
| **Fetch API** | Todas as requisições HTTP (sem Axios) |
| **Lucide React** | Ícones |
| **Oxlint** | Lint do código |
| **Vercel** | Deploy do front-end |

---

## 📄 Páginas e rotas

| Rota | Página | Tipo |
|---|---|---|
| `/` | Home: problema, como funciona, prévia do mapa e do placar, ODS | Institucional |
| `/sobre` | Sobre a solução e diferenciais | Institucional |
| `/integrantes` | Equipe | Institucional |
| `/integrantes/:id` | Perfil de um integrante | Institucional · **rota com parâmetro** |
| `/faq` | Perguntas frequentes | Institucional |
| `/contato` | Formulário de contato com validação | Institucional |
| `/mapa` | Mapa do bairro com as ocorrências e filtros | Solução · `GET` na API |
| `/registrar` | Formulário para registrar uma ocorrência | Solução · `POST` na API |
| `/ocorrencias/:id` | Detalhe, histórico e botão "Eu também vi" | Solução · **rota com parâmetro** · `GET` e `POST` na API |
| `/placar` | Ranking das regiões por período | Solução · `GET` na API |
| `*` | Página não encontrada | — |

O arquivo `vercel.json` redireciona todas as rotas para o `index.html`, então qualquer rota pode ser acessada direto pela URL na versão publicada.

---

## 🔌 Integração com a API Java

Todas as chamadas passam por uma única função, `requisitar()`, em `src/services/api.ts`, que usa `fetch`, converte o JSON e transforma os erros da API (400, 404, 409…) em mensagens em português para a tela.

| Ação na tela | Método e rota | Arquivo |
|---|---|---|
| Listar ocorrências do bairro (mapa) | `GET /ocorrencias?bairro={id}` | `ocorrenciaService.ts` |
| Ver detalhe de uma ocorrência | `GET /ocorrencias/{id}` | `ocorrenciaService.ts` |
| Ver histórico de status | `GET /ocorrencias/{id}/historico` | `ocorrenciaService.ts` |
| Registrar ocorrência | `POST /ocorrencias` | `ocorrenciaService.ts` |
| Apoiar ("Eu também vi") | `POST /ocorrencias/{id}/apoios` | `ocorrenciaService.ts` |
| Placar das regiões | `GET /placar?inicio=&fim=` | `placarService.ts` |

As respostas são tipadas com interfaces que espelham os DTOs da API (`src/types/api.ts`). Toda tela que busca dados trata os três estados: **carregando**, **erro de requisição** e **lista vazia**.

**Observações desta versão**
- O mapa mostra um bairro ilustrativo (Vila Mariana). Outros bairros ficam para a próxima versão.
- O formulário de contato valida os campos e simula o envio, porque a API não tem rota de contato.

---

## 📁 Estrutura de pastas

```
Front-end-ResolveAi/
├── public/                 # favicon e ícones
├── src/
│   ├── assets/images/      # logo e fotos dos integrantes
│   ├── components/         # componentes reutilizáveis (Navbar, Footer, Logo, Avatar…)
│   │   └── ocorrencia/     # StatusBadge, FotoOcorrencia e config de status
│   ├── data/               # textos e dados fixos das páginas (FAQ, integrantes, home…)
│   ├── hooks/              # useOcorrencias, useOcorrencia, useTituloPagina
│   ├── routes/             # uma pasta por página, com os componentes só dela
│   │   ├── Home/  Sobre/  Integrantes/  Integrante/  Faq/  Contato/
│   │   ├── Mapa/  Registrar/  Ocorrencia/  Placar/
│   │   └── NaoEncontrada/
│   ├── services/           # chamadas à API (fetch) e validação de formulário
│   ├── types/              # tipos e interfaces TypeScript
│   ├── utils/              # coordenadas, posição no mapa, geolocalização
│   ├── App.tsx             # layout com Navbar, Outlet e Footer
│   ├── main.tsx            # definição das rotas
│   └── index.css           # Tailwind e tema
├── index.html
├── package.json
├── vercel.json             # rewrite para a SPA funcionar na Vercel
└── vite.config.ts
```

---

## ▶️ Como executar

**Pré-requisitos:** Node.js 20 ou superior e npm.

```bash
# 1. Clonar o repositório
git clone https://github.com/ResolveAI-Global-Solution/Front-end-ResolveAi.git
cd Front-end-ResolveAi

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Por padrão o front usa a API publicada no Render. Para apontar para outra API (por exemplo, rodando local), crie um arquivo `.env.local` na raiz:

```
VITE_API_URL=http://localhost:8080
```

**Outros comandos**

| Comando | O que faz |
|---|---|
| `npm run build` | Checa os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve a versão de produção localmente |
| `npm run lint` | Roda o Oxlint |

---

## 👥 Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
|---|---|---|---|---|
| Andrei Oliveira de Sousa | 573373 | 1TDSPW | [@andreisou-dev](https://github.com/andreisou-dev) | [andrei-sousa](https://www.linkedin.com/in/andrei-sousa-55662825a) |
| Felipe Coelho da Fonseca | 572133 | 1TDSPW | [@devfcoelho](https://github.com/devfcoelho) | [felipe-coelho](https://www.linkedin.com/in/felipe-coelho-80b78a394) |
| Henrique Soares Pereira | 569898 | 1TDSPW | [@Henriquesope](https://github.com/Henriquesope) | [henrique-soares-pereira](https://www.linkedin.com/in/henrique-soares-pereira) |
| Luiz Felipe Lourenço da Silva | 572576 | 1TDSPW | [@devlipee](https://github.com/devlipee) | [lfelipelourenco](https://www.linkedin.com/in/lfelipelourenco) |

---


Projeto acadêmico · FIAP · Global Solution 2026/2

# Evidence Bundle — NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS

## Identidade e governança

- Work Order: `NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS`.
- Branch/PR: `work/nexlabs-wo-009-m06a-technology-solutions`, PR #12 para `main`.
- Base aprovada do Work Order: `3147c1dfa55e2e19fdb8510ac474ef7574961526`.
- HEAD de entrada ligado ao Context Lock: `9cfcdf95232f22e888e407f8bb152d48cf8ae83f`.
- Context Lock: `.engineering/context-locks/NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS.json` (SHA-256 `5eec29c5ba098109afc29f67969a82838876cfaa3c8e898723957f0e9633dbce`).
- Preflight: 22 fingerprints críticos corresponderam ao snapshot do lock e os 10 caminhos `staleIfChanged` também corresponderam ao Source Pack travado. Nenhuma fonte crítica STALE.
- HEAD de implementação/código e testes validado localmente: `37fe123b61ead5fd5d83df9bfc12555bf913ce4c`. A atualização documental deste bundle e do Checkpoint Delta é posterior e não altera código/configuração executável. O SHA final da PR e seus checks exatos estão registrados nos metadados da PR #12.
- A PR permanece OPEN/READY FOR REVIEW. Este delta não promove o Checkpoint e não admite M06B.

## Escopo entregue

- Páginas estáticas/server-rendered `/technology` e `/solutions`, com metadados por rota, conteúdo da `SECONDARY-PAGES-SPEC.md`, hierarquia semântica e ilustrações CSS/SVG.
- Primitivas compartilhadas pequenas em `secondary-page.tsx` e CSS Module, sem cliente global, dependências novas, canvas, WebGL ou importação de `HeroScene`.
- Navegação global e footer agora apontam Solutions para `/solutions`, Technology para `/technology`, marca para `/`, e Research/Company/CTA para anchors explícitos da Home.
- Testes unitários da Home atualizados, cobertura unitária das duas rotas e E2E M06A; a regressão visual/e2e existente da Home grava agora no diretório de evidências deste Work Order.

## Arquivos de implementação e testes

- Adicionados: `src/app/technology/page.tsx`, `src/app/technology/technology.module.css`, `src/app/solutions/page.tsx`, `src/app/solutions/solutions.module.css`, `src/components/secondary-page.tsx`, `src/components/secondary-page.module.css`, `src/app/secondary-pages.test.tsx`, `tests/e2e/m06a.spec.ts`.
- Modificados: `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/app/page.test.tsx`, `tests/e2e/home.spec.ts`.
- `package.json` e `package-lock.json` não mudaram. `@gef-bootstrap/cli@1.1.2` permanece fixado e instalado; nenhuma dependência foi adicionada.

## Checks e testes locais

| Check | Resultado |
|---|---|
| `npm ci` | PASS — 243 pacotes instalados; 0 vulnerabilidades reportadas pela instalação |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS — 4 arquivos, 21 testes |
| `npm run build` | PASS — `/`, `/technology`, `/solutions`, `/_not-found` e `/icon.svg` prerenderizados |
| `npm run test:e2e` | PASS — 16/16 no Chromium, incluindo 12 cenários da Home e 4 de M06A |
| E2E legado de navegação atualizado | PASS — 2/2 após alinhar expectativas às novas rotas globais |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilidades |
| `git diff --cached --check` / `git diff --check` | PASS |
| Scan de padrões de segredo nos arquivos de implementação/teste | PASS — nenhum match |
| GEF | PASS — `npm ls @gef-bootstrap/cli --depth=0` mostra `@gef-bootstrap/cli@1.1.2` |

O primeiro E2E completo identificou duas expectativas antigas que ainda esperavam os anchors `#capabilities`/`#infrastructure` no menu global. Os testes foram atualizados para verificar `/solutions`, `/technology` e o conteúdo da rota Technology. Uma análise SonarCloud intermediária no HEAD `417d1807e5ae50792bd3de51fb2f01c6a9ba8ba5` reprovou o gate por 4.1076% de duplicação nova (87 linhas/4 blocos, limite 3%) e apontou um problema MAJOR de contraste em `secondary-page.module.css`. A refatoração parametrizada dos testes e a correção de contraste estão no commit `37fe123b61ead5fd5d83df9bfc12555bf913ce4c`; nenhum gate foi alterado. O E2E integral final passou em 16/16 e a suíte unitária em 21/21.

## Browser, acessibilidade e responsividade

- Playwright Chromium: páginas desktop 1600×900 e mobile 390×844; keyboard-focus captures; navegação cruzada e CTA; reduced-motion; os checks de overflow passaram em 1440×900, 900×768, 390×844 e 320×740.
- axe-core/WCAG 2.2 AA: zero violações automatizadas nas duas rotas e na Home.
- Skip link e foco visível verificados por teclado; `prefers-reduced-motion: reduce` remove a animação não essencial dos motivos secundários.
- As rotas secundárias têm um H1, títulos/descrições distintos, links apenas para destinos admitidos, nenhuma rota futura fabricada e nenhum `canvas`/chunk `three` ou `hero-scene`.
- `agent-browser@0.38.2` via `npx` verificou o servidor Docker em `http://127.0.0.1:3000`: Home com conteúdo não vazio, console capturado `[]`, overlay de erro `OK`, snapshot interativo com links/heading; `/technology` e `/solutions` exibiram título e H1 esperados.

## Performance e isolamento de chunks

- `route-performance-report.json`: budget por rota de 225,280 bytes gzip (220 KiB); `/technology` e `/solutions` mediram 133,659 bytes gzip cada, abaixo do limite. Nenhum chunk específico de Three/hero foi carregado pelas páginas secundárias.
- Medição laboratorial desktop 1600×900: Technology LCP 220 ms / CLS 0; Solutions LCP 176 ms / CLS 0; sem overflow horizontal.
- Regressão Home, perfil mobile 4G e CPU 4×: LCP 2,404 ms (alvo ≤2,500 ms), CLS 0, proxy de interação 136 ms (alvo ≤200 ms), JS inicial 136,828 bytes gzip. Resultado dentro dos limites por 96 ms para LCP; é uma medição de laboratório local, não dado de usuários reais. Uma execução integral intermediária oscilou para 3,008 ms; a execução isolada seguinte e a execução integral final passaram. O limite permaneceu inalterado.
- O perfil BALANCED preexistente mediu 59.9 FPS medianos / p95 16.7 ms a 900×768. O perfil FULL, simulado neste host com SwiftShader, mediu 20 FPS medianos / p95 116.6 ms; M06A não alterou a cena ou seu código. O ambiente de GPU virtual não representa uma qualificação de GPU de produção.

Relatórios: [rotas M06A](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/route-performance-report.json) e [regressão/performance Home](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/home-performance-report.json).

## Evidência visual

- Technology: [desktop 1600×900](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/technology-desktop-1600x900.png), [mobile 390×844](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/technology-mobile-390x844.png), [foco por teclado](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/technology-keyboard-focus.png).
- Solutions: [desktop 1600×900](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/solutions-desktop-1600x900.png), [mobile 390×844](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/solutions-mobile-390x844.png), [foco por teclado](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/solutions-keyboard-focus.png).
- Home: screenshots de Home, continuidade entre seções, foco, poster/mobile, reduced motion, fallback e identidade visual preservada em `NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/`.
- Prova visual do Home no Docker via agent-browser: [captura anotada](NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS/docker-home-agent-browser.png).

## Docker e acesso local

- Docker Engine/client `29.8.1`; Compose `v5.5.1`.
- Imagem reconstruída com o código final M06A: `nexlabs-website-web:latest`, ID `sha256:20f065c0ec56e2ff0a20ea1d3441fbbf6a04709f1fb70bfd7970d7aa62d4d8ad`.
- Container `nexlabs-website-web-1`; Compose projeto `nexlabs-website`; container saudável; Node `v22.23.3`, npm `10.9.9`, usuário não-root `node` (UID/GID 1000).
- Bind: `127.0.0.1:3000 -> 3000/tcp`. Healthcheck PASS; a origem Compose no container é o worktree M06A.
- Comandos executados: `docker compose config`, `docker compose build`, `docker compose up -d`, `docker compose ps`, `docker compose logs --tail=100`, `docker inspect`, `docker exec ... node --version/npm --version/id`.
- Respostas via host: `/` HTTP 200; `/technology` HTTP 200; `/solutions` HTTP 200. Browser confirmou visualmente Home e as duas rotas. Compose permanece UP/healthy; `docker compose down` não foi executado.
- Para acompanhar: `docker compose up -d`, `docker compose logs -f`, `docker compose ps`. Para encerrar manualmente após o review: `docker compose down`.

## Segurança, riscos e gaps

- `npm audit --audit-level=moderate`: 0 achados; dependências e lockfile intactos; nenhum segredo encontrado no scan de padrões.
- Não foram alterados workflows, gates, permissões de GitHub ou proteções. A PR #12 já estava OPEN e não draft; nenhum merge foi executado.
- `agent-browser` não estava instalado globalmente; a verificação foi executada sem persistir dependência de projeto via `npx`, versão 0.38.2. Também foi usada a suíte Chromium/Playwright do repositório.
- A execução de LCP foi laboratorial e o perfil FULL usou SwiftShader; confirmar desempenho em GPU/dispositivo físico continua fora da qualificação local.
- O log de desenvolvimento do Home registrou o aviso preexistente `THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.`; as rotas M06A continuam sem erros/overlays, e o componente Home fora do escopo não foi alterado.
- A análise SonarCloud do HEAD intermediário `417d1807e5ae50792bd3de51fb2f01c6a9ba8ba5` falhou pelos achados descritos acima; reanálise exata do candidato corrigido ainda depende do push. Checks GitHub (CI Quality, Browser Smoke, Socket, SonarCloud, CodeRabbit) devem ser lidos no SHA final. A revisão independente exata e o merge permanecem gates externos; não são alegados aqui como aprovados.

## Checkpoint Delta

Delta proposto em `.engineering/checkpoint-deltas/NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS-PROPOSED.md`. Ele descreve M06A sem alterar `CHECKPOINT.md/json`, sem se autoaprovar e sem iniciar M06B.

# Evidence Bundle — NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS

## Identidade e governança

- Work Order: `NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS`.
- Branch/PR: `work/nexlabs-wo-009-m06a-technology-solutions`, PR #12 para `main`.
- Base aprovada do Work Order: `3147c1dfa55e2e19fdb8510ac474ef7574961526`.
- HEAD de entrada ligado ao Context Lock: `9cfcdf95232f22e888e407f8bb152d48cf8ae83f`.
- Context Lock: `.engineering/context-locks/NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS.json` (SHA-256 `5be08b165543582a179cb60bb2733a63d4ddf36c0229794aa13ef0321ebccae4`).
- Preflight: 22 fingerprints críticos corresponderam ao snapshot do lock e os 10 caminhos `staleIfChanged` também corresponderam ao Source Pack travado. Nenhuma fonte crítica STALE.
- HEAD de implementação/testes validado localmente: `2322200b501ae6240ca8f250910985e9b7ae3148` (polling do skip link preservando o limite visual existente). O código de produto segue no SHA `37fe123b61ead5fd5d83df9bfc12555bf913ce4`. O follow-up de governança/evidência é documental; SHA final e checks exatos devem ser lidos nos metadados da PR #12.
- Correção de governança validada: o Work Order exige regressão da Home e `src/app/page.test.tsx` foi atualizado para as novas rotas globais, mas o Context Lock original não permitia esse arquivo. O allow-list agora admite somente esse teste unitário adicional; a implementação continua limitada ao WO-009.
- A PR permanece OPEN/READY FOR REVIEW. Este delta não promove o Checkpoint e não admite M06B.

## Escopo entregue

- Páginas estáticas/server-rendered `/technology` e `/solutions`, com metadados por rota, conteúdo da `SECONDARY-PAGES-SPEC.md`, hierarquia semântica e ilustrações CSS/SVG.
- Primitivas compartilhadas pequenas em `secondary-page.tsx` e CSS Module, sem cliente global, dependências novas, canvas, WebGL ou importação de `HeroScene`.
- Navegação global e footer agora apontam Solutions para `/solutions`, Technology para `/technology`, marca para `/`, e Research/Company/CTA para anchors explícitos da Home.
- Testes unitários da Home atualizados, cobertura unitária das duas rotas e E2E M06A; a regressão visual/e2e existente da Home grava agora no diretório de evidências deste Work Order.

## Arquivos de implementação e testes

- Adicionados: `src/app/technology/page.tsx`, `src/app/technology/technology.module.css`, `src/app/solutions/page.tsx`, `src/app/solutions/solutions.module.css`, `src/components/secondary-page.tsx`, `src/components/secondary-page.module.css`, `src/app/secondary-pages.test.tsx`, `tests/e2e/m06a.spec.ts`.
- Modificados: `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/app/page.test.tsx`, `tests/e2e/home.spec.ts`.
- Governança/evidência: o Context Lock admite agora o teste de regressão da Home exigido pelo Work Order; Evidence Bundle e Checkpoint Delta registram a correção de escopo/review.
- `package.json` e `package-lock.json` não mudaram. `@gef-bootstrap/cli@1.1.2` permanece fixado e instalado; nenhuma dependência foi adicionada.

## Checks e testes locais

| Check | Resultado |
|---|---|
| `npm ci` | PASS — 243 pacotes instalados; 0 vulnerabilidades reportadas pela instalação |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS — 4 arquivos, 21 testes |
| `npm run build` | PASS — `/`, `/technology`, `/solutions`, `/_not-found` e `/icon.svg` prerenderizados |
| `npm run test:e2e` | PASS — 16/16 no Chromium após a correção de sincronização do skip link, incluindo 12 cenários da Home e 4 de M06A |
| E2E legado de navegação atualizado | PASS — 2/2 após alinhar expectativas às novas rotas globais |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilidades |
| `git diff --cached --check` / `git diff --check` | PASS |
| Scan de padrões de segredo nos arquivos de implementação/teste | PASS — nenhum match |
| GEF | PASS — `npm ls @gef-bootstrap/cli --depth=0` mostra `@gef-bootstrap/cli@1.1.2` |

O primeiro E2E completo identificou duas expectativas antigas que ainda esperavam os anchors `#capabilities`/`#infrastructure` no menu global. Os testes foram atualizados para verificar `/solutions`, `/technology` e o conteúdo da rota Technology. Uma análise SonarCloud intermediária no HEAD `417d1807e5ae50792bd3de51fb2f01c6a9ba8ba5` reprovou o gate por 4.1076% de duplicação nova (87 linhas/4 blocos, limite 3%) e apontou um problema MAJOR de contraste em `secondary-page.module.css`. A refatoração parametrizada dos testes e a correção de contraste estão no commit `37fe123b61ead5fd5d83df9bfc12555bf913ce4c`; nenhum gate foi alterado. O E2E integral final passou em 16/16 e a suíte unitária em 21/21.

### Correção pós-review do Browser Smoke

No SHA `418457afe1126a5b25c93e14a7dd51b564b2eaa7`, o teste de foco leu `getBoundingClientRect().top` durante a transição de entrada do skip link e observou `-8 px`. O commit `2322200b501ae6240ca8f250910985e9b7ae3148` faz a asserção aguardar por polling até o mesmo requisito original (`top >= 0`), sem alterar CSS ou o limite. A suíte Playwright completa passou 16/16 depois da correção; o próximo candidato remoto precisa repetir Browser Smoke no SHA exato.

## Browser, acessibilidade e responsividade

- Playwright Chromium: páginas desktop 1600×900 e mobile 390×844; keyboard-focus captures; navegação cruzada e CTA; reduced-motion; os checks de overflow passaram em 1440×900, 900×768, 390×844 e 320×740.
- axe-core/WCAG 2.2 AA: zero violações automatizadas nas duas rotas e na Home.
- Skip link e foco visível verificados por teclado; `prefers-reduced-motion: reduce` remove a animação não essencial dos motivos secundários.
- As rotas secundárias têm um H1, títulos/descrições distintos, links apenas para destinos admitidos, nenhuma rota futura fabricada e nenhum `canvas`/chunk `three` ou `hero-scene`.
- `agent-browser@0.38.2` via `npx` verificou o servidor Docker em `http://127.0.0.1:3000`: Home com conteúdo não vazio, console capturado `[]`, overlay de erro `OK`, snapshot interativo com links/heading; `/technology` e `/solutions` exibiram título e H1 esperados.

## Performance e isolamento de chunks

- `route-performance-report.json`: budget por rota de 225,280 bytes gzip (220 KiB); `/technology` e `/solutions` mediram 133,659 bytes gzip cada, abaixo do limite. Nenhum chunk específico de Three/hero foi carregado pelas páginas secundárias.
- Medição laboratorial desktop 1600×900: Technology LCP 256 ms / CLS 0; Solutions LCP 200 ms / CLS 0; sem overflow horizontal.
- Regressão Home, perfil mobile 4G e CPU 4×: leitura final da suíte integral LCP 2,380 ms (alvo ≤2,500 ms), CLS 0, proxy de interação 56 ms (alvo ≤200 ms), JS inicial 136,828 bytes gzip. Leituras laboratoriais integrais anteriores excederam o alvo de LCP em 3,008 ms e 2,860 ms; a execução isolada de performance e a suíte integral seguinte passaram. A variação está preservada aqui; o limite permaneceu inalterado. Não são dados de usuários reais.
- BALANCED a 900×768: 59.9 FPS medianos / p95 33.3 ms. BALANCED a 1600×900: 30.1 FPS medianos / p95 33.4 ms. FULL, exercitado neste host com SwiftShader, mediu 20 FPS medianos / p95 116.7 ms. M06A não alterou a cena ou seu código; GPU virtual não qualifica GPU de produção.

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
- No HEAD remoto `418457afe1126a5b25c93e14a7dd51b564b2eaa7`, CI Quality, Socket Project Report, Socket Pull Request Alerts e SonarCloud passaram; Sonar registrou zero bugs, code smells, duplicações, vulnerabilidades e hotspots. Browser Smoke falhou somente na asserção transitória do skip link descrita acima. CodeRabbit estava `PENDING / Review in progress`; não há aprovação independente. O achado MAJOR de contraste intermediário está `FIXED/CLOSED` no Sonar.
- O candidato local com a correção `2322200` passou E2E 16/16, lint, typecheck, build, unidade 21/21 e npm audit. CI/Sonar/Socket/CodeRabbit serão revalidados no HEAD remoto final depois do push do follow-up e lidos na PR #12; resultados de SHA anterior não são tratados como aprovação do candidato atual. A revisão independente exata permanece pendente; a PR segue aberta para review.

## Checkpoint Delta

Delta proposto em `.engineering/checkpoint-deltas/NEXLABS-WO-009-M06A-TECHNOLOGY-SOLUTIONS-PROPOSED.md`. Ele descreve M06A sem alterar `CHECKPOINT.md/json`, sem se autoaprovar e sem iniciar M06B.

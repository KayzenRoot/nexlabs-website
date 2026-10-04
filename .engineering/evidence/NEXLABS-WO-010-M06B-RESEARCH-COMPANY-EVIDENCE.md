# Evidence Bundle — NEXLABS-WO-010-M06B-RESEARCH-COMPANY

## Identidade e governança

- Work Order: `NEXLABS-WO-010-M06B-RESEARCH-COMPANY`.
- Repositório: `KayzenRoot/nexlabs-website`; `origin` confirmado como `https://github.com/KayzenRoot/nexlabs-website.git`.
- Branch/PR: `work/nexlabs-wo-010-m06b-research-company`, PR #14 → `main`.
- Base aprovada/admission SHA: `96330a8d50c30fab2a680b27f1c56252a4ac4fb6`.
- HEAD remoto/local antes da implementação: `fdb10c3a17b0c961972ff79c8992ecc5e9b4aa06`.
- Referência imutável validada mais recente de implementação e testes: `806bae704bc148879ce903ac5547ca36390907ea` (implementação em `c4f8d7138961fd8443f73506e90a6a7e0c94264b`; commits de testes/evidência em `92afc944a44af460c3bfb376edb40b2a7b627994`, `7167c2cda720b7de72659fef9bfa3ba8711167c8`, `0dd3e34ee3c9568ec606298f6c3773fadabba608` e `806bae704bc148879ce903ac5547ca36390907ea`).
- Context Lock: `.engineering/context-locks/NEXLABS-WO-010-M06B-RESEARCH-COMPANY.json`, SHA-256 `0ee80a7414813d881b994f62b6c0c28df1b7fb84a0f36de7bc000fff9877a021`.
- Preflight na base admitida: 22 fontes críticas e 12 fontes de código-base conferidas; `STALE_COUNT=0`. `startingHead` e `mainSha` do lock são iguais à base acima. Nenhuma fonte crítica foi alterada.
- O clone principal com alterações locais pré-existentes foi preservado; o trabalho ocorreu no worktree isolado da branch autorizada, inicialmente limpo. Sem reset, rebase, force-push ou reescrita de histórico.
- O SHA final do PR e seus checks exatos são registrados nos metadados/aba Checks da PR #14 após o último push. Este arquivo registra separadamente os SHAs imutáveis de implementação/testes para não criar ciclo autorreferente de SHA.

## Resultado do escopo

- `/research`: hero semântico, quatro etapas do método, cinco áreas de exploração, seção de integridade e CTA para Company, com metadata canônica.
- `/company`: hero, propósito, quatro princípios operacionais, quatro comportamentos do modelo de trabalho, integridade e CTA para Research, com metadata canônica.
- M06A foi generalizado para o vocabulário compartilhado M06; novas ilustrações são SVG/CSS leves com `prefers-reduced-motion`.
- Header/footer e transições da Home, Technology e Solutions levam Research/Company às rotas reais. O CTA de próximo capítulo continua `/#contact`.
- A copy transitória da Home foi substituída exatamente pela frase canônica. Âncoras da Home e demais CTAs não relacionados foram mantidos.
- Não foi criada rota ou formulário `/contact`. Não houve dependências ou alteração em `package.json`/`package-lock.json`. GEF continua em `@gef-bootstrap/cli@1.1.2`.
- Nenhuma cena WebGL/Three, claims de clientes/publicações/equipe, CMS, autenticação, analytics ou funcionalidade de M06C foi introduzida.

## Arquivos de implementação e testes

**Adicionados:**

- `src/app/research/page.tsx`, `src/app/research/research.module.css`;
- `src/app/company/page.tsx`, `src/app/company/company.module.css`;
- `tests/e2e/m06b.spec.ts`.

**Modificados:**

- `src/components/secondary-page.tsx`, `src/components/secondary-page.module.css`;
- `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/home-sections.tsx`;
- `src/app/technology/page.tsx`, `src/app/solutions/page.tsx`;
- `src/app/page.test.tsx`, `src/app/secondary-pages.test.tsx`;
- `tests/e2e/home.spec.ts`, `tests/e2e/m06a.spec.ts`.

**Evidência/governança adicionada:**

- `.engineering/evidence/NEXLABS-WO-010-M06B-RESEARCH-COMPANY-EVIDENCE.md` e os artefatos abaixo;
- `.engineering/checkpoint-deltas/NEXLABS-WO-010-M06B-RESEARCH-COMPANY-PROPOSED.md`.

Os caminhos alterados estão dentro do `writeAllowed` do Context Lock. O Checkpoint canônico permaneceu inalterado.

## Ambiente e checks locais

| Verificação | Resultado |
|---|---|
| `npm ci` | PASS — 243 pacotes adicionados; 254 auditados; 0 vulnerabilidades reportadas |
| Runtime local | Node `v24.19.0` (requisito ≥22), npm `11.17.0`, Git `2.55.0.windows.3` |
| GEF | PASS — `npm ls @gef-bootstrap/cli --depth=0` confirma `@gef-bootstrap/cli@1.1.2` |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run test` | PASS — 4 arquivos, 25 testes |
| `npm run build` | PASS — `/`, `/research`, `/company`, `/technology`, `/solutions`, `/_not-found` e `/icon.svg` gerados estaticamente |
| `npm run test:e2e` | PASS — 19/19 no Chromium: Home, regressões M06A e M06B |
| `npm audit --audit-level=moderate` | PASS — 0 vulnerabilidades |
| `git diff --check` / `git diff --cached --check` | PASS |
| Scan de padrões de segredo | PASS — nenhum token/chave privada ou atribuição de credencial encontrado nos fontes, testes e evidências textuais |

`npm ci` e as validações acima não alteraram os manifests; nenhum pacote novo foi introduzido.

## Navegador, conteúdo e acessibilidade

- Playwright verificou metadata/copy exatas, um H1 por página, ausência de canvas/cena Home e ausência de erros de console. As transições verificam links do header/footer nas cinco rotas, CTAs de Research da Home/Technology/Solutions, CTA de próximo capítulo e `/contact` 404.
- axe-core `4.13.0` / `@axe-core/playwright@4.13.0`, tags WCAG 2.2 AA: zero violações em `/research` e `/company`.
- O axe deixou a verificação `color-contrast` como incompleta em 63 nós de Research e 61 de Company, pois gradientes/pseudo-elementos impedem o cálculo automático do fundo. Isso não é uma violação reportada; permanece como limitação para revisão manual de contraste.
- Skip link e foco por teclado passam; `prefers-reduced-motion: reduce` remove a animação ornamental medida; alterações relevantes continuam em HTML semântico.
- Sem overflow horizontal em 1600×900, 1440×900, 900×768, 390×844 e 320×740.
- Evidências de navegação registram destinations verificados no header/footer em `/`, `/technology`, `/solutions`, `/research` e `/company`; `/contact` permanece reservado e retorna 404.
- O proxy laboratorial do skip link por teclado até o segundo animation frame mediu 42,4 ms em Research e 53,3 ms em Company (alvo ≤200 ms). Não é medição de INP de usuários reais.

## Performance e isolamento

Fonte: Playwright Chromium contra build de produção local, relatório `.engineering/evidence/NEXLABS-WO-010-M06B-RESEARCH-COMPANY/route-performance-report.json`.

| Rota | JS inicial gzip (limite 225.280 B) | LCP desktop 1600×900 | LCP mobile 390×844 | CLS desktop/mobile |
|---|---:|---:|---:|---:|
| `/research` | 133.659 B | 212 ms | 96 ms | 0 / 0 |
| `/company` | 133.659 B | 168 ms | 120 ms | 0 / 0 |

- Os bundles iniciais ficam abaixo de 220 KiB gzip e não incluem chunks `three`/`hero-scene`; as duas rotas não renderizam canvas ou runtime WebGL.
- Os valores são medições laboratoriais deste host, não dados de usuários reais. O array Event Timing de carga não recebeu eventos; o proxy de interação por teclado foi medido separadamente em 42,4 ms (Research) e 53,3 ms (Company).

## Evidências retidas

- [Relatório axe](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/axe-results.json) — zero violações, incompletudes descritas.
- [Relatório de overflow/responsividade](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/responsive-overflow-report.json).
- [Relatório de navegação e CTAs](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/navigation-report.json).
- [Relatório de performance e bundles](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/route-performance-report.json).
- Capturas desktop 1600×900 e mobile 390×844 de [Research](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/research-desktop-1600x900.png) / [Research mobile](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/research-mobile-390x844.png) e [Company](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/company-desktop-1600x900.png) / [Company mobile](NEXLABS-WO-010-M06B-RESEARCH-COMPANY/company-mobile-390x844.png).
- Capturas de foco por teclado, reduced motion e header/footer: `research-keyboard-focus.png`, `research-reduced-motion.png`, `research-footer-navigation-1600x900.png`, `company-keyboard-focus.png`, `company-reduced-motion.png`, `company-footer-navigation-1600x900.png`.
- Transições capturadas: `home-research-cta-transition-1600x900.png`, `home-final-research-cta-transition-1600x900.png`, `technology-research-cta-transition-1600x900.png`, `solutions-research-cta-transition-1600x900.png`.

## Docker e acesso local

- Docker Engine `29.8.1`; Docker Compose `v5.5.1`.
- Imagem `nexlabs-website-web:latest`, ID `sha256:a0e1ab1cbd87130b785197798b417283a9abdaf40026020bc5ffc8fa5381d40d`.
- Container `nexlabs-website-web-1`, ID `89f8cb0829653504142a8f2139641997f4618b46dc8f402e2db2b452e559a32b`, usuário `node`; runtime interno Node `v22.23.3` / npm `10.9.9`.
- Estado final consultado: `Up (healthy)`; healthcheck HTTP local passou. Porta publicada `127.0.0.1:3000 -> 3000/tcp`; URL `http://127.0.0.1:3000`.
- Comandos executados: `docker compose config`, `docker compose build`, `docker compose up -d`, `docker compose ps`, `docker compose logs --tail=100`, `docker inspect`, `docker image inspect` e checagem HTTP pelo host.
- HTTP final pelo host: `/` 200; `/technology` 200; `/solutions` 200; `/research` 200; `/company` 200; `/contact` 404. Logs mostram Next.js 16.3.8 pronto.
- Compose permanece ativo e healthy. `docker compose down` não foi executado.
- Acompanhamento: `docker compose up -d`, `docker compose logs -f`, `docker compose ps`; encerramento manual posterior: `docker compose down`.

## Riscos e gates externos

- Limitação de acessibilidade: axe não automatiza a verificação de contraste sobre gradientes; requer confirmação manual do revisor. Nenhuma violação axe foi reportada.
- Cobertura browser local: Chromium/Playwright; navegadores/dispositivos físicos adicionais não foram testados.
- Aprovação independente do HEAD exato: PENDING até revisão externa; isso é um gate antes de merge, não altera o estado pedido de PR aberta para review.
- CodeRabbit pediu que o teste reduced-motion inspecione também descendentes do wrapper SVG; o commit `806bae704bc148879ce903ac5547ca36390907ea` verifica todos os elementos internos, inclusive `.signalTrail`. O relatório arredonda proxies a uma casa decimal e os valores deste Evidence Bundle correspondem ao JSON retido.
- O nitpick CodeRabbit de baixa prioridade pede alterar `staleIfChanged` no Context Lock. Esse caminho não está no `writeAllowed`; alterá-lo exigiria nova admissão e mudaria o lock validado. Nenhuma fonte crítica mudou, então a sugestão permanece pendente fora deste Work Order.
- No HEAD anterior `4875eaf154842f111e785d029f1de76fc4306ed4`, SonarCloud reprovou o limite inalterado de duplicação nova: 4,5% (81 linhas, máximo 3%), em quatro blocos repetidos entre `tests/e2e/m06a.spec.ts` e `tests/e2e/m06b.spec.ts`. O commit `0dd3e34ee3c9568ec606298f6c3773fadabba608` reestruturou somente o teste M06B, sem remover assertions nem alterar gates; lint, typecheck, unit e E2E passaram localmente. O resultado Sonar exato do novo HEAD ainda precisa ser conferido na PR após o próximo push.
- Uma execução integral local teve o teste de performance legado da Home medir LCP mobile em 3.388 ms, acima do limite existente de 2.500 ms. O retry isolado desse teste passou e a suíte integral seguinte passou 19/19; nenhum limite ou gate foi alterado.
- CI Quality, Browser Smoke, Sonar, Socket e CodeRabbit do HEAD candidato são consultados novamente após o último push e registrados nos metadados da PR. Checks de SHAs anteriores não são reutilizados como resultado do candidato.
- Nenhuma proteção, check ou gate foi enfraquecido. A PR permanece OPEN; sem merge, promoção do Checkpoint ou início do M06C.

## Checkpoint Delta

Delta proposto em `.engineering/checkpoint-deltas/NEXLABS-WO-010-M06B-RESEARCH-COMPANY-PROPOSED.md`. O estado canônico não foi promovido. A PR deve permanecer aberta até revisão independente; o próximo módulo não é admitido por este incremento.

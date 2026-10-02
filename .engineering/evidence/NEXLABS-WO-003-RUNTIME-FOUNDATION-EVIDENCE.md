# Evidence Bundle — NEXLABS-WO-003-RUNTIME-FOUNDATION

Estado: validação do executor concluída para o conteúdo de runtime; PR #4 permanece aberta e está READY FOR REVIEW; o executor encerrou em draft e o auditor a promoveu para review para habilitar a auditoria externa. Este documento é evidência, não promoção de Checkpoint.

## Identidade e estado

- Repositório: `KayzenRoot/nexlabs-website` (`origin` verificado).
- Branch: `work/nexlabs-wo-003-runtime-foundation`.
- PR: [#4](https://github.com/KayzenRoot/nexlabs-website/pull/4), base `main`, OPEN/READY FOR REVIEW.
- Base SHA imutável: `9aa51209bfda05246ffc3d558e459b2a4243ff62`.
- HEAD do incremento de runtime validado localmente e no primeiro conjunto exato de CI: `824836ec3eeef65645817b6298919e4e88aff8da`.
- HEAD inicial da branch antes da edição: `83689d2b5f81ddc8d9998618c912bf1e2649fa6e`; a working tree estava limpa e a base correspondia a `origin/main`.
- A finalização deste Evidence Bundle e do Checkpoint Delta é um commit documental posterior. O HEAD final da PR e os checks reexecutados nesse HEAD estão registrados na descrição e nos checks da PR, evitando atribuir a este arquivo um SHA autorreferente.

## Runtime e dependências

- Node local: `v24.19.0`; npm: `11.17.0`; Git: `2.55.0.windows.3`.
- Runtime de CI: Node 22, definido por `.nvmrc` e `actions/setup-node`.
- GEF instalado: `@gef-bootstrap/cli@1.1.2`, versão confirmada por `npx gef --version`.
- `package.json` permanece `private: true`, `engines.node >=22`, e fixa GEF exatamente em `1.1.2`.
- Runtime web: Next.js `16.3.8`, React/React DOM `19.3.0`, TypeScript `6.0.3`, todos com versões exatas e lockfile.
- Website padrão: inglês (`<html lang="en">`, metadados, navegação e conteúdo). Português e espanhol ficam como localizações futuras; não foi adicionada infraestrutura de internacionalização nem seletor de idioma.
- A aplicação permanece sem canvas/WebGL e sem dependências Three.js, React Three Fiber, Drei, GSAP ou asset 3D de produção.

## Arquivos adicionados ou modificados

**Modificados**

- `.engineering/README.md`
- `.gitignore`
- `README.md`
- `package.json`
- `package-lock.json`

**Runtime, estilos e testes adicionados**

- `.nvmrc`, `next-env.d.ts`, `next.config.ts`, `tsconfig.json`
- `eslint.config.mjs`, `vitest.config.mts`, `playwright.config.ts`
- `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/page.module.css`, `src/app/page.test.tsx`
- `src/components/site-header.tsx`, `src/components/site-header.module.css`
- `src/components/site-footer.tsx`, `src/components/site-footer.module.css`
- `src/components/static-hero.tsx`, `src/components/static-hero.module.css`
- `src/styles/tokens.css`, `src/test/setup.ts`, `tests/e2e/home.spec.ts`

**CI, Dependabot e evidência visual adicionados**

- `.github/workflows/ci-quality.yml`, `.github/workflows/browser-smoke.yml`, `.github/dependabot.yml`
- `.engineering/evidence/NEXLABS-WO-003-RUNTIME-FOUNDATION/screenshots/home-mobile-390x844.png`
- `.engineering/evidence/NEXLABS-WO-003-RUNTIME-FOUNDATION/screenshots/home-desktop-1440x900.png`

## Resultados de validação

| Comando/check | Resultado |
| --- | --- |
| `npm ci` | PASS; instalação limpa do lockfile, 244 pacotes adicionados, 255 auditados, 0 vulnerabilidades reportadas. |
| `npm run lint` | PASS. |
| `npm run typecheck` | PASS; TypeScript estrito. |
| `npm run test` | PASS; 1 arquivo, 2 testes. |
| `npm run build` | PASS; `/` e `/_not-found` pré-renderizadas estaticamente. |
| `npm run test:e2e` | PASS; 4 testes Chromium, sem erros de console/página, sem overflow horizontal nos dois viewports, links internos resolvidos. |
| Axe na Home | PASS; zero violações nas tags WCAG 2.0 A/AA, 2.1 A/AA e 2.2 AA. |
| Teclado e movimento reduzido | PASS; skip link/foco visíveis e operáveis; `prefers-reduced-motion` mantém a composição estática. |
| Screenshots | PASS; PNGs medidos em 390×844 e 1440×900. |
| `npm audit --audit-level=high` | PASS; 0 vulnerabilidades. |
| `npm ls --depth=0` | PASS; dependências esperadas instaladas, inclusive GEF `1.1.2`. |
| Varredura local de padrões de segredo | PASS; sem correspondências de alto sinal nos arquivos de implementação/configuração. |
| `git diff --check` | PASS. |

Checks GitHub do HEAD de runtime acima:

- [CI Quality — run 37031616578](https://github.com/KayzenRoot/nexlabs-website/actions/runs/37031616578): PASS.
- [Browser Smoke — run 37031616637](https://github.com/KayzenRoot/nexlabs-website/actions/runs/37031616637): PASS.
- Checks adicionais observados: Dependabot configuration e Socket Security passaram; CodeRabbit indicou review ignorado porque a PR está em draft.

## GEF

- `npx gef --version`: sucesso; `1.1.2`.
- `npx gef doctor`: terminal `SUCCEEDED`, `ok: true`; Node, plataforma, Git e repositório observável saudáveis; nenhuma observação de limite.
- O próprio relatório do doctor mantém `security.dependency.state=REVIEW` (`provenance=unverified`) e `security.github.state=REVIEW` (`writePermission=false`). A sessão `gh` estava autenticada como `KayzenRoot` e conseguiu criar/verificar o ruleset e atualizar settings; portanto, o campo de permissão do doctor não refletiu a capacidade efetiva usada nesta execução.
- `npx gef status`: terminal `SUCCEEDED`, `ok: true`; repositório limpo depois do commit de runtime; Checkpoint ainda `M02_ADMITTED_IMPLEMENTATION_NOT_STARTED`, operador `stale=true` e drift classificado como `UNEXPECTED` contra o baseline inicial do GEF.
- O drift decorre do início autorizado do WO-003 após o baseline de bootstrap. Não foi executado `gef init`, refresh/reindex nem promoção de Checkpoint para ocultá-lo; o Checkpoint canônico permanece intacto e a proposta aguarda auditoria independente.

## GitHub

- `gh auth status`: autenticado como `KayzenRoot`; operações REST necessárias foram concluídas.
- Ruleset `Nex Labs main governance`, ID `24376369`: ativo em `refs/heads/main`; exige PR, checks estritos `CI Quality` e `Browser Smoke` (GitHub Actions app `15368`), resolução de conversas e histórico linear; bloqueia exclusão e non-fast-forward/force-push. Contagem de aprovações configurada em zero para não exigir autoaprovação neste repositório solo.
- O parâmetro padrão do GitHub para aprovação extra em PRs Copilot sem atribuição ficou habilitado; com contagem de aprovações igual a zero, a regra não exige aprovação adicional, conforme [documentação de rulesets](https://docs.github.com/en/enterprise-cloud%40latest/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets).
- Settings verificados: squash habilitado; merge commit/rebase desabilitados; exclusão automática da branch após merge habilitada; default branch `main`; permissão padrão de token de Actions somente leitura (`contents: read`), sem permissão para aprovar PRs.
- Secret scanning e push protection estão habilitados.
- `.github/dependabot.yml` agenda atualizações npm semanais (segunda-feira, 09:00, `America/Sao_Paulo`), limite de cinco PRs abertos e grupos por tipo.
- A API não encontrou branch protection clássica (404) antes da configuração; o ruleset ativo acima é a proteção aplicada. A configuração separada de Dependabot security updates está `disabled`; o Work Order exige o agendamento semanal de versões (presente), não essa automação adicional.

## Riscos, limites e limite de escopo

- Nenhuma falha HIGH/CRITICAL conhecida foi encontrada; auditoria npm e checks Socket Security passaram.
- O provenance das dependências não foi validado pelo GEF doctor (`unverified`); os pacotes estão fixos no lockfile e `npm audit` não encontrou vulnerabilidades.
- Atualizações automáticas de segurança do Dependabot permanecem desabilitadas no nível do repositório; atualizações de versão semanais estão configuradas.
- O executor encerrou com a PR em draft; o auditor a marcou READY FOR REVIEW e o CodeRabbit foi acionado no exact head subsequente. Auditoria exata independente é pendente e continua obrigatória antes de qualquer merge.
- A visualização é fallback CSS estático para M02; arte final, páginas adicionais, backend, implantação e recursos 3D seguem fora do escopo.
- Não houve merge, ampliação de escopo nem enfraquecimento de gates.

## Complemento de desenvolvimento Docker — complemento do owner

Validado na branch `work/nexlabs-wo-003-runtime-foundation`, PR #4, contra a base imutável `9aa51209bfda05246ffc3d558e459b2a4243ff62`. O commit de implementação deste complemento é `3fe86cf2722514b0500644456150c734a5ba3d44`; o commit documental final e o HEAD remoto exato permanecem registrados na descrição/checks da PR.

### Arquivos do complemento

- Adicionados: `.dockerignore`, `Dockerfile`, `compose.yaml`.
- Modificados: `README.md` (comandos de operação), `next.config.ts` (origem loopback e polling restritos a Docker), `src/components/site-footer.tsx` (copy herdada ajustada para o idioma padrão inglês).
- Governança atualizada antes das alterações: `.engineering/work-orders/NEXLABS-WO-003-DOCKER-COMPLEMENT.md`, `.engineering/work-orders/NEXLABS-WO-003-RUNTIME-FOUNDATION.md` e `.engineering/context-locks/NEXLABS-WO-003-RUNTIME-FOUNDATION.json`; o Context Lock limita a origem extra a `127.0.0.1`, o polling a `NEXT_DOCKER_DEV=1` e o fallback Webpack somente ao container.
- Nenhuma alteração em `package.json` ou `package-lock.json`; `git diff --exit-code -- package.json package-lock.json` passou. GEF permanece fixado em `@gef-bootstrap/cli@1.1.2`.

### Docker e navegador host

- Docker Engine: `29.8.1`; Docker Compose: `v5.5.1`.
- Imagem: `nexlabs-website-web:latest`, ID/digest `sha256:04a225f37acbbcfb73053bae84d436140e07361ce4381a21999049ace1d2a888`, construída de `node:22-bookworm-slim` (base digest `sha256:43ac6c60b8f89723f746e8a92ce91abd5017e627ce1ddfe4238355d3a30b772c`).
- Container: `nexlabs-website-web-1`, ID `cfe764b6d4e594fd901cbd5d9b9801da0ca3f014dac810c4657c18b19bd17710`; usuário efetivo `node` (não-root), healthcheck `healthy`.
- Runtime no container: Node `v22.23.3`, npm `10.9.9`.
- Porta: host `127.0.0.1:3000` → container `3000/tcp`; `Invoke-WebRequest http://127.0.0.1:3000/` retornou HTTP `200`.
- Compose tem somente `web`; `src/` é bind-mounted read-only, `.next` usa volume nomeado gravável, capabilities são removidas e `no-new-privileges` está ativo. O `.dockerignore` exclui dependências locais, artefatos de governança/teste e arquivos de segredo; nenhum secret ou serviço extra foi adicionado.
- Comandos obrigatórios: `docker compose config` — PASS; `docker compose build` — PASS (`npm ci` no build adicionou 247 pacotes, auditou 258, 0 vulnerabilidades); `docker compose up -d` — PASS; `docker compose ps` — PASS (`Up`, health `healthy`); `docker compose logs --tail=100` — PASS (Next.js pronto e requisições `GET /` retornando 200). `docker compose down` está documentado e **não foi executado**.
- Chrome no host abriu `http://localhost:3000/`; título `Nex Labs Technology — A New Space Taking Shape`, página Home renderizada com título principal `Technology for what comes next.`, navegação inglesa e copy do rodapé `A new space is taking shape.`. `src/app/layout.tsx` declara `lang="en"`.
- HMR: uma alteração temporária no H2 (`HMR probe`) apareceu no DOM do Chrome sem reload. O arquivo foi restaurado byte a byte ao blob inicial `04f5619cd25be6124713b7e562fa2b812dc356d6`; hash final confirmado igual e o container/navegador voltou ao H2 original. O primeiro probe com Turbopack não detectou o evento do bind mount Windows; foi corrigido com Webpack e `watchOptions.poll=1000` apenas quando `NEXT_DOCKER_DEV=1`, além da origem loopback estritamente local indicada pelo Next.js.
- Limitação observada: a primeira compilação de desenvolvimento no filesystem Windows/Docker levou aproximadamente 8,2 s. Polling a cada 1 s aumenta a leitura do diretório `src/`; o probe final confirmou atualização automática. Os guias oficiais do [Next.js](https://nextjs.org/docs/app/guides/local-development), [origens dev do Next.js](https://nextjs.org/docs/pages/api-reference/config/next-config-js/allowedDevOrigins) e [polling Webpack](https://webpack.js.org/configuration/watch/#watchoptionspoll) fundamentam o fallback.

### Checks finais depois do ajuste

- `npm run lint` — PASS.
- `npm run typecheck` — PASS.
- `npm run test` — PASS, 2/2.
- `npm run build` — PASS com Turbopack (prova que a configuração Webpack condicionada a Docker não altera o build local/CI).
- `npm run test:e2e` — PASS, 4/4 Chromium, incluindo acessibilidade, teclado/foco, reduced motion e viewports móveis/desktop.
- `npm audit --audit-level=high` — PASS, 0 vulnerabilidades; `npm ls --depth=0` — PASS, inclui GEF `1.1.2`; `git diff --check` — PASS.
- `docker compose ps` final mostrou o container ativo/healthy. A Home segue aberta no Chrome e a PR permanece sem merge.
- Estado Git de encerramento após o commit deste bundle: working tree limpa, branch local sincronizada com `origin/work/nexlabs-wo-003-runtime-foundation`; `origin/main` permanece em `9aa51209bfda05246ffc3d558e459b2a4243ff62`. O SHA final documental está no estado atual da PR #4.

## Checkpoint Delta proposto

Após checks finais no HEAD atual da PR, revisão independente `APPROVED` e merge autorizado separadamente, propor: M02 Runtime & Repository Foundation aprovado; runtime Next.js/TypeScript, tokens, Home estática, testes, CI e regras do repositório validados; M03 Brand System & N Monogram como próximo incremento elegível. Não atribuir percentual sem modelo ponderado explícito.

Até esses gates: manter `.engineering/CHECKPOINT.md` e `.engineering/CHECKPOINT.json` como estão, M02 sem promoção e PR #4 OPEN/READY FOR REVIEW. Ver `.engineering/checkpoint-deltas/NEXLABS-WO-003-RUNTIME-FOUNDATION-PROPOSED.md`.

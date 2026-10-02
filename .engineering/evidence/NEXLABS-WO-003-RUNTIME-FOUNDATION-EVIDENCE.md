# Evidence Bundle — NEXLABS-WO-003-RUNTIME-FOUNDATION

Estado: validação do executor concluída para o conteúdo de runtime; PR #4 permanece aberta e em draft, aguardando auditoria independente. Este documento é evidência, não promoção de Checkpoint.

## Identidade e estado

- Repositório: `KayzenRoot/nexlabs-website` (`origin` verificado).
- Branch: `work/nexlabs-wo-003-runtime-foundation`.
- PR: [#4](https://github.com/KayzenRoot/nexlabs-website/pull/4), base `main`, draft.
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
- O review automático CodeRabbit foi ignorado por a PR permanecer draft. Auditoria exata independente é pendente e continua obrigatória antes de qualquer merge.
- A visualização é fallback CSS estático para M02; arte final, páginas adicionais, backend, implantação e recursos 3D seguem fora do escopo.
- Não houve merge, ampliação de escopo nem enfraquecimento de gates.

## Checkpoint Delta proposto

Após checks finais no HEAD atual da PR, revisão independente `APPROVED` e merge autorizado separadamente, propor: M02 Runtime & Repository Foundation aprovado; runtime Next.js/TypeScript, tokens, Home estática, testes, CI e regras do repositório validados; M03 Brand System & N Monogram como próximo incremento elegível. Não atribuir percentual sem modelo ponderado explícito.

Até esses gates: manter `.engineering/CHECKPOINT.md` e `.engineering/CHECKPOINT.json` como estão, M02 sem promoção e PR #4 OPEN/DRAFT. Ver `.engineering/checkpoint-deltas/NEXLABS-WO-003-RUNTIME-FOUNDATION-PROPOSED.md`.

# WO-013 CD-06 — remediação de dependências

**Estado inicial:** OWNER-RE-ADMITTED / EXECUÇÃO EM CURSO

**Repositório/PR:** `KayzenRoot/nexlabs-website` / #20

**Base/HEAD de admissão:** `e14cfbe4660b076db85e7e529befffe17a098cd1` / `e3d5b82d3bb7a35271ebd69523528ca56496f902`
**Autorização:** comentário do owner em [PR #20](https://github.com/KayzenRoot/nexlabs-website/pull/20#issuecomment-6504223112), 2026-10-29.

## Escopo autorizado

- Next.js exato `16.3.8 → 16.4.3` e Vitest exato `4.1.11 → 4.1.12`.
- Somente resoluções compatíveis no `package-lock.json` necessárias à correção dos findings já reportados pelo `npm audit`.
- Nenhuma dependência nova, alteração de aplicação, migração de runtime/toolchain, afrouxamento de gate, merge, promoção de checkpoint ou deploy.

## Base de segurança e runtime

No HEAD de admissão, `npm audit --audit-level=moderate` falhou com um finding CRITICAL em Next.js, dois HIGH em Vite/Undici e dois MODERATE em Vitest/`@vitest/mocker`. `npm audit fix --dry-run --json` preservou os manifests e a árvore Git, mas não podia alterar os pins diretos exatos.

Referências dos mantenedores/releases consultadas:

- [Next.js security advisories](https://github.com/vercel/next.js/security/advisories) e [releases oficiais](https://github.com/vercel/next.js/releases), incluindo a release `v16.4.3`.
- [Vitest releases oficiais](https://github.com/vitest-dev/vitest/releases), incluindo `v4.1.12`.
- [Vite releases oficiais](https://github.com/vitejs/vite/releases), incluindo `v8.3.5`.
- [Undici releases oficiais](https://github.com/nodejs/undici/releases), incluindo a correção de segurança `v8.12.2` e `v8.12.3`.

As engines/peers atuais do registry foram consultadas para Next `16.4.3`, Vitest `4.1.12`, Vite `8.3.5` e Undici `8.12.3`. Undici requer Node `>=22.19.0`; o ambiente e os runners que executarem a suite devem atender a esse mínimo. Compatibilidade de registry não substitui os testes.

## Evidências e continuidade

O Delta 06 e a autorização foram registrados também em D-0032 e no Work Order WO-013. O Context Lock desta PR é atualizado com escopo exato, fingerprints e timestamp antes da edição de pacotes e será recompilado depois da edição. O teste/audit final, revisão do diff, retestes e checks exatos do novo HEAD serão anexados aqui após execução.

Visual acceptance >=85/100, aprovação independente exata, aceite visual do owner, Blender MCP, regras de branch, checkpoint, merge, produção e M07B permanecem gates separados. Esta evidência não declara esses gates satisfeitos.


## Re-admission after owner-authorized baseline substitution — 2026-10-30

The owner authorized replacement of the unrecoverable local commit preservation requirement in PR #20 comment `6529953961` (D-0034). CD-06 is re-admitted under the new Context Lock v5 and exact replacement baseline HEAD `379c12a950dae03b512a2543672cb54f339cc124`, base `e14cfbe4660b076db85e7e529befffe17a098cd1`.
The package remediation remains limited to Next.js `16.3.8 → 16.4.3`, Vitest `4.1.11 → 4.1.12`, and only compatible lockfile resolutions needed to clear the already-recorded audit findings. No new dependency, product behavior change, gate waiver, merge, checkpoint promotion or deployment is authorized.

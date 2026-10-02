# Complemento de escopo — ambiente Docker de desenvolvimento

Estado: ADICIONADO PELO OWNER AO NEXLABS-WO-003; execução limitada à PR #4.

## Âncora de estado

- Repositório: `KayzenRoot/nexlabs-website`.
- Branch/PR: `work/nexlabs-wo-003-runtime-foundation` / PR #4, base `main`.
- Base original de M02: `9aa51209bfda05246ffc3d558e459b2a4243ff62`.
- HEAD da PR que inicia este complemento: `61334748d42f331a6370f7587effa464830a4210`.
- A branch local e remota estavam limpas e no mesmo HEAD; `origin/main` continuava na base original.

Este complemento formaliza a instrução direta do owner de 2026-10-02. O Context Lock de WO-003 é atualizado antes de alterar os arquivos Docker e registra os caminhos e fingerprints desta adição. Ele estende apenas o ambiente local de desenvolvimento; não admite deploy ou runtime de produção.

## Escopo admitido

- Criar `Dockerfile`, `compose.yaml` e `.dockerignore` para o Next.js em modo de desenvolvimento.
- Usar Node.js 22, npm e o `package-lock.json` existente; preservar a dependência exata `@gef-bootstrap/cli@1.1.2`.
- Iniciar `npm run dev`, publicar a porta do site para o host e usar bind mount seguro para o código-fonte com hot reload.
- Executar como usuário não-root, fornecer healthcheck e não incluir secrets.
- Criar somente o serviço web; nenhum banco, Redis, proxy ou outro serviço.
- Documentar os comandos Docker solicitados no `README.md` e registrar a evidência e o Checkpoint Delta proposto em `.engineering/**`.
- Corrigir somente o texto herdado do rodapé da Home para inglês, atendendo à instrução direta anterior do owner de que inglês seja o idioma padrão do website; não traduzir nem alterar outros conteúdos neste complemento.
- Como a execução do navegador mostrou que Next.js bloqueava os recursos HMR para o host `127.0.0.1`, permitir somente essa origem local em `next.config.ts` via `allowedDevOrigins`; sem curingas ou hosts externos. A configuração oficial do Next.js documenta essa opção para origens de desenvolvimento adicionais ([referência](https://nextjs.org/docs/pages/api-reference/config/next-config-js/allowedDevOrigins)).

## Validação obrigatória

Executar e registrar:

1. `docker compose config`
2. `docker compose build`
3. `docker compose up -d`
4. `docker compose ps`
5. `docker compose logs --tail=100`
6. Abrir o site no navegador do host e confirmar a Home em inglês.
7. Alterar temporariamente o título em `src/app/page.tsx`, confirmar hot reload no navegador do host e restaurar byte a byte o conteúdo inicial (`git blob 04f5619cd25be6124713b7e562fa2b812dc356d6`), sem deixar diff.
8. Confirmar versão Docker/Compose, imagem, container, porta publicada e estado do healthcheck.

## Limites e condição de parada

- Preservar os manifests npm/lockfile e não adicionar dependências.
- Alterações persistentes de escopo limitado: substituir somente a frase em português do rodapé da Home por sua versão em inglês, conforme instrução direta anterior do owner; e adicionar somente `allowedDevOrigins: ["127.0.0.1"]` em `next.config.ts` para que o navegador no host possa receber HMR pelo mapeamento de loopback. Não alterar outras páginas, componentes ou copy, não permitir wildcard/external origin. A única escrita adicional em `src/app/page.tsx` é o probe temporário de HMR acima, que deve ser revertido e validado contra o blob inicial.
- Docker Desktop no Windows pode deixar o HMR mais lento por causa do acesso a arquivos bind-mounted; medir o resultado real e registrar a limitação se aparecer. [Guia oficial do Next.js](https://nextjs.org/docs/app/guides/local-development).
- Documentar `docker compose down`, mas não executá-lo: o container precisa permanecer rodando ao concluir.
- Não fazer merge; não usar force-push, rebase ou reescrita de histórico.
- Parar com a PR aberta, container ativo e Evidence Bundle/Checkpoint Delta atualizados. Se Docker, browser ou HMR falhar sem correção segura, registrar o bloqueio em vez de declarar PASS.

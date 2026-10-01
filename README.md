# Bambolê Kids

Landing page em Next.js. Para rodar localmente, instale as dependências com `npm install` e execute `npm run dev`.

## Acompanhamento de tráfego

- Cada carregamento da página registra uma visita. Cliques em **Entrar no grupo** e **Falar no privado** são registrados separadamente, com parâmetros UTM e referência de origem.
- Um lead é um navegador distinto que clicou em qualquer botão de WhatsApp no período exibido. A conversão é `visitantes que clicaram ÷ visitantes que acessaram × 100`. Os registros antigos usam IP como aproximação. O clique não confirma entrada no grupo ou compra.
- No terceiro clique do mesmo navegador, aparece um convite opcional para informar nome ou telefone. O visitante pode seguir para o WhatsApp sem preencher. Os contatos enviados aparecem no painel e no arquivo exportado.
- O painel mostra hoje, acumulado, últimos sete dias, localização aproximada, origem e campanhas UTM. Na Vercel, país, estado e cidade vêm dos cabeçalhos de geolocalização por IP; em outras hospedagens podem aparecer como não identificados.
- O painel é aberto pelo link privado `/painel?chave=SUA_CHAVE`, usando `ANALYTICS_ACCESS_KEY` no servidor. Não há usuário ou senha para digitar. Depois de abrir o link, o navegador guarda o acesso por 30 dias. Para instalações anteriores, `ANALYTICS_PASSWORD` ainda funciona como chave do link até ser substituída. O botão **Baixar registros .txt** exporta os eventos, incluindo IP, data, destino e parâmetros UTM.
- Em servidor com disco persistente, os eventos são gravados em `data/analytics.txt`, que está fora do Git. Faça backup desse arquivo.
- Na Vercel, conecte um banco Upstash Redis e configure `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`. O arquivo `.txt` é gerado no download do painel; o disco da função não guarda dados entre execuções. Sem essas variáveis, a API retorna erro em vez de indicar um registro que não ocorreu.

Copie `.env.example` para `.env.local` e preencha as variáveis necessárias. Não publique a senha ou o arquivo de eventos.

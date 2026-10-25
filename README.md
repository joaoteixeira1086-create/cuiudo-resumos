# Cuiudo · Biblioteca de medicina

A mesma biblioteca funciona pela pasta no computador e pelo site no Safari do iPad. Capas, atmosferas, favoritos, notas, progresso e caderno continuam disponíveis.

## Adicionar resumos no computador

1. Abra `indice_resumos.html` na pasta **resumos medicina** e conecte essa pasta.
2. Entre na fase, na UC e na matéria desejadas.
3. Clique em **Adicionar resumo** e escolha o HTML.

O arquivo será salvo em `Fase 5/UC XV/PBL/arquivo.html`, por exemplo. As subpastas são criadas quando necessário.

Também é possível colocar um HTML diretamente em uma subpasta de matéria. O índice verifica a pasta conectada quando você volta à janela. Na publicação, a lista de cards é reconstruída a partir dessas pastas, inclusive para arquivos que ainda não foram cadastrados no índice.

## Enviar atualizações para o iPad

Na pasta **resumos medicina**, abra **PUBLICAR-ATUALIZACOES.cmd**. Ele prepara os arquivos novos e alterados e envia as mudanças para o GitHub. Aguarde a confirmação e depois a publicação terminar.

Se preferir usar o GitHub Desktop:

No GitHub Desktop, abra este repositório. Os arquivos novos, alterados e removidos aparecem em **Changes**. Escreva uma descrição curta, clique em **Commit to main** e depois em **Push origin**. Quando a publicação em **Actions** terminar, a biblioteca do site estará atualizada.

Na primeira configuração do repositório, entre em **Settings → Pages → Source → GitHub Actions**. O fluxo de publicação já está no arquivo `.github/workflows/publicar.yml`.

## Usar no iPad

Abra o endereço publicado no Safari. Pelo menu Compartilhar, escolha **Adicionar à Tela de Início**. O botão **Usar offline** guarda os resumos e os recursos que puderem ser baixados. Aguarde a confirmação antes de sair da internet. Alguns recursos externos de resumos interativos podem depender do primeiro carregamento com internet.

As notas, os favoritos, o progresso e os HTMLs adicionados pelo iPad pertencem à biblioteca daquele dispositivo. Os arquivos pessoais não são enviados ao GitHub. Use **Backup da biblioteca** regularmente e o backup próprio do caderno para preservar também suas anotações nele.

## Publicação e dados pessoais

O site publica os HTMLs das pastas de fase e os arquivos do aplicativo. Backups antigos, a pasta `_cadernos`, dados de estudo, favoritos e histórico pessoal não entram na publicação. As notas e o progresso de um dispositivo não substituem os de outro.

## Conferência local da publicação

Com Node.js instalado, execute `node sistema/tools/build-site.cjs`. A pasta `sistema/_site` conterá o site estático pronto; esse mesmo comando é executado pelo GitHub automaticamente.

## Organização da pasta

Abra `indice_resumos.html` para estudar e `PUBLICAR-ATUALIZACOES.cmd` para enviar atualizações. Os arquivos de suporte ficam em `sistema`. A pasta `Backup` guarda somente a cópia mais recente e não é publicada.

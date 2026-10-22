# Minhas Tarefas — gerar o EXE sem instalar Node.js no seu computador

Este projeto usa GitHub Actions para compilar o aplicativo em um computador temporário na nuvem. Você não precisa instalar Node.js ou npm no seu Windows.

## Como gerar o EXE

1. Crie um repositório no GitHub (pode ser **Private**).
2. Descompacte este ZIP no seu computador.
3. Envie **todos os arquivos e pastas que estão dentro da pasta do projeto** para a raiz do repositório. Confira especialmente que `.github/workflows/build-windows.yml` foi enviado.
   - Se o GitHub não mostrar a pasta `.github`, habilite a visualização de arquivos ocultos no seu sistema ou envie os arquivos pelo site mantendo o caminho `.github/workflows/build-windows.yml`.
4. No repositório do GitHub, abra a aba **Actions**.
5. Na lateral, selecione **Gerar EXE para Windows**.
6. Clique em **Run workflow** e confirme no botão verde.
7. Aguarde o processo terminar com um ícone verde. Normalmente leva alguns minutos.
8. Abra a execução concluída, desça até **Artifacts** e baixe **Minhas-Tarefas-Windows**.
9. Descompacte o arquivo baixado. Dentro estará o `.exe` portátil.

## Importante

- Não precisa instalar Node.js/npm no seu computador; o GitHub instala as ferramentas temporariamente na nuvem.
- O repositório pode ser privado.
- O EXE é para Windows 64-bit.
- O app salva as tarefas localmente neste computador/neste perfil do Windows; elas não sincronizam automaticamente com outros dispositivos.
- O arquivo gerado fica disponível no GitHub Actions por 14 dias.
- O primeiro uso do EXE pode mostrar um aviso do Windows/SmartScreen porque o aplicativo não tem assinatura digital. Só execute se você confia no código e no repositório que enviou.
- Se a aba Actions estiver desabilitada, confira **Settings → Actions → General** e permita workflows no repositório.

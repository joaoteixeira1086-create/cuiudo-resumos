@echo off
setlocal
cd /d "%~dp0"
set "CUIUDO_GIT=git"
if exist "%LOCALAPPDATA%\hermes\git\cmd\git.exe" set "CUIUDO_GIT=%LOCALAPPDATA%\hermes\git\cmd\git.exe"
echo Preparando as atualizacoes da biblioteca...
node sistema\tools\check-publication.cjs
if errorlevel 1 goto erro
"%CUIUDO_GIT%" add -A
if errorlevel 1 goto erro
"%CUIUDO_GIT%" diff --cached --quiet
if errorlevel 1 (
  "%CUIUDO_GIT%" commit -m "Atualiza biblioteca de resumos"
  if errorlevel 1 goto erro
)
"%CUIUDO_GIT%" push origin main
if errorlevel 1 goto erro
echo.
echo Atualizacoes enviadas. Aguarde a publicacao no GitHub terminar.
echo Site: https://joaoteixeira1086-create.github.io/cuiudo-resumos/
pause
exit /b 0
:erro
echo.
echo Nao consegui enviar. Nenhum resumo foi apagado.
echo Confira a conexao e o acesso ao GitHub antes de tentar novamente.
pause
exit /b 1

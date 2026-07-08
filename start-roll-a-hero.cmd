@echo off
setlocal
title Roll a Hero
cd /d "%~dp0"

REM Explorer launches this with your SAVED PATH, which is not the PATH a
REM developer shell has. On this machine the saved PATH contains the Python
REM Launcher (py.exe) but NOT python.exe -- so a bare `python` check reports
REM "Python isn't installed" on a machine that plainly has Python.
REM
REM So: try each interpreter and PROVE it runs. `where` isn't enough -- Windows
REM ships a python.exe stub in WindowsApps that exists, resolves, and does
REM nothing but offer to open the Microsoft Store.
set "PY="
for %%C in ("py -3" "py" "python" "python3") do (
  if not defined PY (
    %%~C -c "import sys" >nul 2>nul && set "PY=%%~C"
  )
)

if not defined PY goto nopython

%PY% serve.py %*
if errorlevel 1 pause
exit /b 0

:nopython
echo.
echo   Couldn't find a working Python on this computer.
echo.
echo   I looked for: py -3, py, python, python3
echo.
echo   Install it from https://www.python.org/downloads/ and tick
echo   "Add python.exe to PATH" during setup. Then double-click this
echo   file again.
echo.
pause
exit /b 1

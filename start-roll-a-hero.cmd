@echo off
title Roll a Hero
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 goto nopython

python serve.py
if errorlevel 1 pause
exit /b 0

:nopython
echo.
echo   Python isn't installed, or isn't on your PATH.
echo.
echo   Get it from https://www.python.org/downloads/ and tick
echo   "Add python.exe to PATH" during the install. Then double-click
echo   this file again.
echo.
pause
exit /b 1

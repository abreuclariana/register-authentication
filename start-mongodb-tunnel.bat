@echo off
echo Starting MongoDB Local + Tunnel Setup...

REM Iniciar MongoDB em background
start "MongoDB" mongod --dbpath C:\data\db

REM Aguardar MongoDB iniciar
timeout /t 5

REM Iniciar ngrok tunnel para MongoDB
start "MongoDB Tunnel" ngrok tcp 27017

echo MongoDB and tunnel started!
echo Check ngrok dashboard: http://localhost:4040
echo Use the TCP URL for your Render app
pause

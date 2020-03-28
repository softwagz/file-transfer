@echo off
COLOR 3F
@echo Bienvenido a File-Transfer
@echo Desarrollado por (Softw-AGZ) Manuel Aguirre 
@echo ........................................................... 
@echo Importante, debes tener instalado Nodejs. 
@echo Podras encontrarlo en la carpe Node.js
@echo -----------------------------------------------------------
@echo ----------------------------------------------------------- 
@echo Deberas conectar tu pc a la Red Wifi de tu Telefono
@echo una vez hecho esto podras acceder a los archivos
@echo que guardes en la carpeta files de este directorio
@echo -----------------------------------------------------------
@echo -----------------------------------------------------------
@echo desde  el navegador de tu telefono, accede a la 
@echo direccion ip seguido de " : " y el puerto, asi...
@echo -----------------------------------------------------------
@echo ip.ip.ip.ip : PORT
@echo -----------------------------------------------------------
@echo 192.168.10.0 : 4000
@echo ___________________________________________________________
@echo esta es la Ip y el puerto con el que reemplazaras
@echo ___________________________________________________________
ipconfig | FINDSTR "Dirección IPv4"
node .
pause
exit
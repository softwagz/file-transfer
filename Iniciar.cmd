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
@echo desde  el navegador Google Chrome de tu telefono, accede  
@echo a la direccion IP seguido de  :  y el numero de puerto.
@echo -----------------------------------------------------------
@echo EJEMPLO:
@echo 192.168.10.0 : 4000
@echo ___________________________________________________________
@echo La Ip que Usaras en Google Crhome desde tu telefono
@echo sera la siguiente: 
@echo ___________________________________________________________
ipconfig | FINDSTR "Dirección IPv4"
node .
pause
exit
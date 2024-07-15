@echo off

echo Borrando imagen sonify_api...
docker rmi sonify_api --force

echo Borrando contenedor sonify_api...
docker rm -f sonify_api

echo Creando nueva imagen de sonify_api...
docker build -t sonify_api C:\Users\deduc\source\repos\SoniFyAPI\SoniFyAPI

echo Creando el nuevo contenedor, esto puede tardar un momento...
docker run -d -p 7296:55555 --name sonify_api sonify_api

echo Contenedor sonify_api actualizado

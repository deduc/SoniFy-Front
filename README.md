# SoniFy-Front

Aplicacion web basada en spotify generada con [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

Usa la API de Spotify para obtener y mostrar los datos del usuario, sus listas de reproducción y modificarlos según permita la API.

## Ejecutar aplicación en modo desarrollo

Comando `ng serve` habilita la aplicación en la url `http://localhost:4200/`.

## Compilar aplicación

Comando `ng build` para compilar el proyecto. Los ficheros resultantes se encuentran en /dist

### Actualizar contenedor Docker para SonifyApi
    # Borrar imagen sonify_api
    docker rmi sonify_api --force

    # Borrar contenedor sonify_api
    docker rm -f sonify_api

    # Crear nueva imagen de sonify_api
    docker build -t sonify_api C:\Users\deduc\source\repos\SoniFyAPI\SoniFyAPI

    # Crear el nuevo contenedor
    docker run -d -p 7296:55555 --name sonify_api sonify_api

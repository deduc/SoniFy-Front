# SpotifyClon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tveests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<hr>

# Estructura de componentes en orden de uso

    pages/login/login.component
    * Usuario clica en boton de login
        + loginService.getAuthParams()
        + localStorage.setItem(redirectUri)
        * redireccionar usuario al login OAuth2.0 y mandarlo a home.component

<br>

    pages/home/home.component
        -> shared-header (usuario navega entre links)
        -> shared-buscador (usuario escribe qué quiere)
            + searchContent()
            + showContent() TODO
        -> home-user-top-artists
            + this.getTopArtistsFromApi()
            + setArtistsListCssProperties()
            * Usuario clica en Ver todos los artistas y se dirige a "/my-artists"
        -> home-user-top-albums
        -> shared-footer
        -> shared-audio-reproducer-bar

<br>

    pages/my-artists/my-artists.component
        + ngOnInit
            - fetchUserTopArtistsList()
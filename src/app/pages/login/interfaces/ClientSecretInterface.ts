export interface ClientSecretInterface {
    client_secret: string

    // Index signature: Sirve para convertir a string clave:valor
    [key: string]: string;
}